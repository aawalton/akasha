"use client"

import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  type PageAudioAsked,
  PageAudioProvider,
  PageSpokenProvider,
} from "akasha/page/ui/component/modules/page-audio/page-audio.module.code.tsx"
import {
  bodyOf,
  errorOf,
  firstPieceIn,
  heldOf,
  JSON_SENT,
  nowPlayingControlled,
  nowPlayingOf,
  playsHlsItself,
  progressWritten,
  readThrough,
  silenceWav,
  streamedInto,
  useLockScreen,
  useSpeed,
} from "akasha/story/chapter/narration/modules/listening/narration-listening.module.code.ts"
import {
  actsAt,
  type ChapterPlaced,
  chapterAt,
  placedOf,
  progressAt,
  type Spoken,
  sameSpoken,
  spokenAt,
} from "akasha/story/chapter/narration/modules/playhead/narration-playhead.module.code.ts"
import {
  nudged,
  type Steering,
  UNSTEERED,
  useLostSession,
  useRecovery,
} from "akasha/story/chapter/narration/modules/recovery/narration-recovery.module.code.ts"
import {
  seekableEnd,
  useNarrationReport,
} from "akasha/story/chapter/narration/modules/report/narration-report.module.code.ts"
import type { ChapterHeld } from "akasha/story/chapter/narration/modules/telling/narration-telling.module.code.ts"
import Hls from "hls.js"
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

export type NarrationReach = {
  readonly fetch: (path: string, init?: RequestInit) => Promise<Response>
  readonly url: (path: string) => string
}

type NarrationShown =
  | { readonly kind: "idle" }
  | { readonly kind: "opening"; readonly asked: PageAudioAsked }
  | { readonly kind: "playing"; readonly asked: PageAudioAsked }
  | { readonly kind: "failed"; readonly asked: PageAudioAsked; readonly error: string }

type Narration = {
  readonly shown: NarrationShown
  readonly chapter: ChapterHeld | null
  readonly halted: boolean
  readonly reconnecting: boolean
  readonly at: number
  readonly end: number
  readonly speed: number
  readonly faster: () => undefined
  readonly toggle: () => undefined
  readonly skip: (seconds: number) => undefined
  readonly seek: (seconds: number) => undefined
  readonly retry: () => undefined
  readonly close: () => undefined
}

type Session = {
  readonly id: string
  readonly chapters: Map<string, ChapterHeld>
  placed: readonly ChapterPlaced[]
  readonly asked: Set<string>
  readonly read: Set<string>
  readonly progress: Map<string, number>
  ended: boolean
  before: number
  leapt: boolean
  savedAt: number
}

const SAVE_EVERY_SECONDS = 20

const CHAPTERS_EVERY_MS = 4000

const NarrationContext = createContext<Narration | null>(null)

export function useNarration(): Narration | null {
  return useContext(NarrationContext)
}

export function NarrationProvider({
  reach,
  children,
}: {
  readonly reach: NarrationReach
  readonly children: ReactNode
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const session = useRef<Session | null>(null)
  const asking = useRef<PageAudioAsked | null>(null)
  const silence = useRef<string | null>(null)
  const streamed = useRef<Hls | null>(null)
  const steering = useRef<Steering>(UNSTEERED)
  const report = useNarrationReport(audioRef, reach.fetch, session, silence)
  const recovering = useRecovery(audioRef, steering, report)
  const told = useLostSession(audioRef, recovering.broken, session)
  const [shown, setShown] = useState<NarrationShown>({ kind: "idle" })
  const [chapter, setChapter] = useState<ChapterHeld | null>(null)
  const [halted, setHalted] = useState(true)
  const [place, setPlace] = useState({ at: 0, end: 0 })
  const [spoken, setSpoken] = useState<Spoken | null>(null)
  const { speed, faster, repace } = useSpeed(audioRef)

  const fail = useCallback((error: string): undefined => {
    const asked = asking.current
    if (asked === null) return
    audioRef.current?.pause()
    setShown({ kind: "failed", asked, error })
  }, [])

  const dropSession = useCallback((): undefined => {
    streamed.current?.destroy()
    streamed.current = null
    const was = session.current
    session.current = null
    if (was !== null) {
      void reach.fetch(`/api/narration/${was.id}`, { method: "DELETE" }).catch(() => undefined)
    }
  }, [reach])

  const open = useCallback(
    async (asked: PageAudioAsked): Promise<undefined> => {
      const audio = audioRef.current
      if (audio === null) return
      let answered: Response
      try {
        answered = await reach.fetch("/api/narration", {
          method: "POST",
          headers: JSON_SENT,
          body: JSON.stringify({ pageType: asked.pageTypeSlug, slug: asked.slug }),
        })
      } catch (thrown) {
        fail(`The narration could not be asked for: ${saidBy(thrown)}`)
        return
      }
      const body = await bodyOf(answered)
      if (asking.current !== asked) return
      const opened = heldOf(body.chapter)
      const { id, playlist } = body
      if (!answered.ok || typeof id !== "string" || typeof playlist !== "string") {
        fail(errorOf(body, answered.status))
        return
      }
      if (opened === null) {
        fail("The narration opened on no chapter.")
        return
      }
      session.current = {
        id,
        chapters: new Map([[opened.id, opened]]),
        placed: [],
        asked: new Set(),
        read: new Set(),
        progress: new Map([[opened.id, opened.ownProgress ?? 0]]),
        ended: false,
        before: 0,
        leapt: false,
        savedAt: 0,
      }
      setChapter(opened)
      nowPlayingOf(opened)
      if (!(await firstPieceIn(reach.fetch, playlist))) {
        fail("The speech workload made no audio for this chapter.")
        return
      }
      if (asking.current !== asked) return
      streamed.current = streamedInto(
        audio,
        reach.url(playlist),
        (from, why) => {
          if (streamed.current === from) recovering.broken(why)
        },
        report
      )
      repace()
      try {
        await audio.play()
        setShown({ kind: "playing", asked })
      } catch (thrown) {
        if (asking.current !== asked) return
        if (thrown instanceof DOMException && thrown.name === "AbortError") {
          setShown({ kind: "playing", asked })
        } else recovering.broken(`The audio would not start: ${saidBy(thrown)}`)
      }
    },
    [reach, fail, repace, recovering]
  )

  const play = useCallback(
    (asked: PageAudioAsked): undefined => {
      const audio = audioRef.current
      if (audio === null) return
      asking.current = asked
      dropSession()
      if (!playsHlsItself(audio) && !Hls.isSupported()) {
        fail("This browser cannot play an HLS stream.")
        return
      }
      silence.current ??= URL.createObjectURL(new Blob([silenceWav()], { type: "audio/wav" }))
      audio.src = silence.current
      void audio.play().catch(() => undefined)
      setShown({ kind: "opening", asked })
      void open(asked)
    },
    [dropSession, fail, open]
  )

  const askNext = useCallback(
    async (playing: Session, after: ChapterHeld): Promise<undefined> => {
      let answered: Response
      try {
        answered = await reach.fetch(`/api/narration/${playing.id}/next`, {
          method: "POST",
          headers: JSON_SENT,
          body: JSON.stringify({ pageType: after.pageTypeSlug, slug: after.slug }),
        })
      } catch (thrown) {
        fail(`The next chapter could not be asked for: ${saidBy(thrown)}`)
        return
      }
      const body = await bodyOf(answered)
      if (!answered.ok) {
        if (!told(playing, answered.status)) fail(errorOf(body, answered.status))
        return
      }
      const next = heldOf(body.chapter)
      if (next === null) playing.ended = true
      else {
        playing.chapters.set(next.id, next)
        playing.progress.set(next.id, next.ownProgress ?? 0)
      }
    },
    [reach, fail, told]
  )

  const save = useCallback((always: boolean): undefined => {
    const audio = audioRef.current
    const playing = session.current
    if (audio === null || playing === null) return
    const seconds = audio.currentTime
    if (!always && Math.abs(seconds - playing.savedAt) < SAVE_EVERY_SECONDS) return
    playing.savedAt = seconds
    const made = progressAt({
      placed: playing.placed,
      seconds,
      written: playing.progress,
      lengthOf: (id) => playing.chapters.get(id)?.ownLength ?? null,
    })
    if (made === null) return
    playing.progress.set(made.id, made.ownProgress)
    progressWritten(playing.chapters.get(made.id), made.ownProgress)
  }, [])

  const tick = useCallback((): undefined => {
    const audio = audioRef.current
    const playing = session.current
    if (audio === null || playing === null) return
    const seconds = audio.currentTime
    const before = playing.before
    const leapt = playing.leapt
    playing.before = seconds
    playing.leapt = false
    const acts = actsAt({
      placed: playing.placed,
      before,
      seconds,
      leapt,
      asked: playing.asked,
      read: playing.read,
      ended: playing.ended,
    })
    readThrough(playing, acts.read, report)
    save(false)
    const after = acts.askNextAfter === null ? undefined : playing.chapters.get(acts.askNextAfter)
    if (after !== undefined) {
      playing.asked.add(after.id)
      void askNext(playing, after)
    }
    const now = chapterAt(playing.placed, seconds)
    const held = now === null ? undefined : playing.chapters.get(now.id)
    if (held !== undefined) {
      setChapter((was) => {
        if (was?.id !== held.id) nowPlayingOf(held)
        return held
      })
    }
    setPlace({ at: seconds, end: seekableEnd(audio) })
    const said = spokenAt(playing.placed, seconds)
    setSpoken((was) => (sameSpoken(was, said) ? was : said))
  }, [askNext, save, report])

  const close = useCallback((): undefined => {
    save(true)
    asking.current = null
    dropSession()
    const audio = audioRef.current
    if (audio !== null) {
      audio.pause()
      audio.removeAttribute("src")
      audio.load()
    }
    setChapter(null)
    setSpoken(null)
    nowPlayingOf(null)
    setShown({ kind: "idle" })
  }, [dropSession, save])

  const finished = useCallback((): undefined => {
    const playing = session.current
    if (playing !== null) {
      const acts = actsAt({
        placed: playing.placed,
        before: playing.before,
        seconds: playing.before + 1,
        leapt: playing.leapt,
        asked: playing.asked,
        read: playing.read,
        ended: true,
      })
      readThrough(playing, acts.read, report)
    }
    close()
  }, [close, report])

  const seek = useCallback((seconds: number): undefined => {
    const audio = audioRef.current
    if (audio === null) return
    audio.currentTime = Math.max(0, Math.min(seconds, seekableEnd(audio)))
  }, [])

  const skip = useCallback(
    (seconds: number): undefined => {
      const audio = audioRef.current
      if (audio !== null) seek(audio.currentTime + seconds)
    },
    [seek]
  )

  const toggle = useCallback((): undefined => {
    const audio = audioRef.current
    if (audio === null) return
    if (audio.paused) void audio.play().catch((thrown: unknown) => fail(saidBy(thrown)))
    else audio.pause()
  }, [fail])

  const retry = useCallback((): undefined => {
    const asked = asking.current
    if (asked !== null) play(asked)
  }, [play])

  steering.current = {
    live: () => asking.current !== null && audioRef.current?.src !== silence.current,
    nudge: () => nudged(audioRef.current, streamed.current),
    keep: () => save(true),
    reopen: () => {
      const here = session.current
      const at = chapterAt(here?.placed ?? [], audioRef.current?.currentTime ?? 0)
      const held = at === null ? undefined : here?.chapters.get(at.id)
      const asked = held ?? asking.current
      if (asked !== null) play(asked)
    },
    giveUp: fail,
  }

  useEffect(() => {
    if (shown.kind !== "playing") return
    const timer = setInterval(() => {
      const playing = session.current
      if (playing === null) return
      void reach
        .fetch(`/api/narration/${playing.id}/chapters`)
        .then(async (answered) => {
          told(playing, answered.status)
          return answered.ok ? placedOf(await answered.json()) : null
        })
        .then((placed) => {
          if (placed !== null && session.current === playing) playing.placed = placed
          tick()
        })
        .catch(() => told(playing, null))
    }, CHAPTERS_EVERY_MS)
    return () => clearInterval(timer)
  }, [shown.kind, reach, tick, told])

  useEffect(() => {
    const audio = audioRef.current
    if (audio === null) return
    audio.disableRemotePlayback = true
    const heard = (): undefined => {
      tick()
    }
    const playing = (): undefined => {
      repace()
      setHalted(false)
    }
    const halting = (): undefined => {
      setHalted(true)
      save(true)
    }
    const ended = (): undefined => {
      if (audio.src !== silence.current) finished()
    }
    const seeking = (): undefined => {
      if (session.current !== null) session.current.leapt = true
    }
    const listened: [string, () => undefined][] = [
      ["seeking", seeking],
      ["loadedmetadata", repace],
      ["timeupdate", heard],
      ["playing", heard],
      ["play", playing],
      ["pause", halting],
      ["ended", ended],
    ]
    for (const [name, listener] of listened) audio.addEventListener(name, listener)
    return () => {
      for (const [name, listener] of listened) audio.removeEventListener(name, listener)
    }
  }, [tick, finished, save, repace])

  useEffect(() => {
    nowPlayingControlled({
      audio: () => audioRef.current,
      placed: () => session.current?.placed ?? [],
      skip,
      seek,
    })
  }, [seek, skip])

  useLockScreen(shown.kind === "opening" || shown.kind === "playing", audioRef, report)

  const narration = useMemo<Narration>(
    () => ({
      shown,
      chapter,
      halted,
      reconnecting: recovering.reconnecting,
      at: place.at,
      end: place.end,
      speed,
      faster,
      toggle,
      skip,
      seek,
      retry,
      close,
    }),
    [shown, chapter, halted, recovering, place, speed, faster, toggle, skip, seek, retry, close]
  )

  const audioAsked = useMemo(() => ({ play }), [play])

  return (
    <NarrationContext.Provider value={narration}>
      <PageAudioProvider audio={audioAsked}>
        <PageSpokenProvider spoken={spoken}>{children}</PageSpokenProvider>
      </PageAudioProvider>
      {/* biome-ignore lint/a11y/useMediaCaption: narration is speech whose text is on the page */}
      <audio ref={audioRef} preload="auto" className="hidden" />
    </NarrationContext.Provider>
  )
}
