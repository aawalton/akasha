"use client"

import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  type PageAudioAsked,
  PageAudioProvider,
} from "akasha/page/ui/component/modules/page-audio/page-audio.module.code.tsx"
import {
  bodyOf,
  errorOf,
  heldOf,
  markRead,
  nowPlayingControlled,
  nowPlayingOf,
  seekableEnd,
  silenceWav,
} from "akasha/story/chapter/narration/modules/listening/narration-listening.module.code.ts"
import {
  actsAt,
  type ChapterPlaced,
  chapterAt,
  placedOf,
} from "akasha/story/chapter/narration/modules/playhead/narration-playhead.module.code.ts"
import type { ChapterHeld } from "akasha/story/chapter/narration/modules/telling/narration-telling.module.code.ts"
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

export type NarrationShown =
  | { readonly kind: "idle" }
  | { readonly kind: "opening"; readonly asked: PageAudioAsked }
  | { readonly kind: "playing"; readonly asked: PageAudioAsked }
  | { readonly kind: "failed"; readonly asked: PageAudioAsked; readonly error: string }

export type Narration = {
  readonly shown: NarrationShown
  readonly chapter: ChapterHeld | null
  readonly halted: boolean
  readonly at: number
  readonly end: number
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
  ended: boolean
  before: number
}

const HLS = "application/vnd.apple.mpegurl"

const CHAPTERS_EVERY_MS = 4000

const STALL_MS = 30_000

const FIRST_PIECE_TRIES = 40

const FIRST_PIECE_WAIT_MS = 500

const PIECE_LISTED = "#EXTINF"

const JSON_SENT = { "content-type": "application/json" }

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
  const stall = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [shown, setShown] = useState<NarrationShown>({ kind: "idle" })
  const [chapter, setChapter] = useState<ChapterHeld | null>(null)
  const [halted, setHalted] = useState(true)
  const [place, setPlace] = useState({ at: 0, end: 0 })

  const fail = useCallback((error: string): undefined => {
    const asked = asking.current
    if (asked === null) return
    audioRef.current?.pause()
    setShown({ kind: "failed", asked, error })
  }, [])

  const dropSession = useCallback((): undefined => {
    const was = session.current
    session.current = null
    if (was !== null) {
      void reach.fetch(`/api/narration/${was.id}`, { method: "DELETE" }).catch(() => undefined)
    }
  }, [reach])

  const firstPieceIn = useCallback(
    async (playlist: string): Promise<boolean> => {
      for (let tried = 0; tried < FIRST_PIECE_TRIES; tried += 1) {
        const answered = await reach.fetch(playlist)
        if (!answered.ok) return false
        if ((await answered.text()).includes(PIECE_LISTED)) return true
        await new Promise((settle) => setTimeout(settle, FIRST_PIECE_WAIT_MS))
      }
      return false
    },
    [reach]
  )

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
        ended: false,
        before: 0,
      }
      setChapter(opened)
      nowPlayingOf(opened)
      if (!(await firstPieceIn(playlist))) {
        fail("The speech workload made no audio for this chapter.")
        return
      }
      if (asking.current !== asked) return
      audio.src = reach.url(playlist)
      try {
        await audio.play()
        setShown({ kind: "playing", asked })
      } catch (thrown) {
        fail(`The audio would not start: ${saidBy(thrown)}`)
      }
    },
    [reach, fail, firstPieceIn]
  )

  const play = useCallback(
    (asked: PageAudioAsked): undefined => {
      const audio = audioRef.current
      if (audio === null) return
      asking.current = asked
      dropSession()
      if (audio.canPlayType(HLS) === "") {
        fail("This browser cannot play an HLS stream; narration plays in Safari and the iOS app.")
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
        fail(errorOf(body, answered.status))
        return
      }
      const next = heldOf(body.chapter)
      if (next === null) playing.ended = true
      else playing.chapters.set(next.id, next)
    },
    [reach, fail]
  )

  const tick = useCallback((): undefined => {
    const audio = audioRef.current
    const playing = session.current
    if (audio === null || playing === null) return
    const seconds = audio.currentTime
    const before = playing.before
    playing.before = seconds
    const acts = actsAt({
      placed: playing.placed,
      before,
      seconds,
      asked: playing.asked,
      read: playing.read,
      ended: playing.ended,
    })
    for (const id of acts.read) {
      playing.read.add(id)
      markRead(playing.chapters.get(id))
    }
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
  }, [askNext])

  const close = useCallback((): undefined => {
    asking.current = null
    dropSession()
    const audio = audioRef.current
    if (audio !== null) {
      audio.pause()
      audio.removeAttribute("src")
      audio.load()
    }
    setChapter(null)
    nowPlayingOf(null)
    setShown({ kind: "idle" })
  }, [dropSession])

  const finished = useCallback((): undefined => {
    const playing = session.current
    if (playing !== null) {
      const acts = actsAt({
        placed: playing.placed,
        before: playing.before,
        seconds: playing.before + 1,
        asked: playing.asked,
        read: playing.read,
        ended: true,
      })
      for (const id of acts.read) markRead(playing.chapters.get(id))
    }
    close()
  }, [close])

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

  useEffect(() => {
    if (shown.kind !== "playing") return
    const timer = setInterval(() => {
      const playing = session.current
      if (playing === null) return
      void reach
        .fetch(`/api/narration/${playing.id}/chapters`)
        .then(async (answered) => (answered.ok ? placedOf(await answered.json()) : null))
        .then((placed) => {
          if (placed !== null && session.current === playing) playing.placed = placed
          tick()
        })
        .catch(() => undefined)
    }, CHAPTERS_EVERY_MS)
    return () => clearInterval(timer)
  }, [shown.kind, reach, tick])

  useEffect(() => {
    const audio = audioRef.current
    if (audio === null) return
    audio.disableRemotePlayback = true
    const calm = (): undefined => {
      if (stall.current !== null) clearTimeout(stall.current)
      stall.current = null
    }
    const waiting = (): undefined => {
      calm()
      if (session.current === null) return
      stall.current = setTimeout(() => fail("The narration stopped arriving."), STALL_MS)
    }
    const errored = (): undefined => {
      if (session.current === null || audio.src === silence.current) return
      fail(`The audio failed: ${audio.error?.message || `code ${audio.error?.code ?? "unknown"}`}`)
    }
    const heard = (): undefined => {
      calm()
      tick()
    }
    const playing = (): undefined => {
      setHalted(false)
    }
    const halting = (): undefined => {
      setHalted(true)
    }
    const ended = (): undefined => {
      if (audio.src !== silence.current) finished()
    }
    const listened: [string, () => undefined][] = [
      ["timeupdate", heard],
      ["playing", heard],
      ["waiting", waiting],
      ["error", errored],
      ["play", playing],
      ["pause", halting],
      ["ended", ended],
    ]
    for (const [name, listener] of listened) audio.addEventListener(name, listener)
    return () => {
      calm()
      for (const [name, listener] of listened) audio.removeEventListener(name, listener)
    }
  }, [fail, tick, finished])

  useEffect(() => {
    nowPlayingControlled({
      audio: () => audioRef.current,
      placed: () => session.current?.placed ?? [],
      skip,
      seek,
    })
  }, [seek, skip])

  const narration = useMemo<Narration>(
    () => ({
      shown,
      chapter,
      halted,
      at: place.at,
      end: place.end,
      toggle,
      skip,
      seek,
      retry,
      close,
    }),
    [shown, chapter, halted, place, toggle, skip, seek, retry, close]
  )

  const audioAsked = useMemo(() => ({ play }), [play])

  return (
    <NarrationContext.Provider value={narration}>
      <PageAudioProvider audio={audioAsked}>{children}</PageAudioProvider>
      {/* biome-ignore lint/a11y/useMediaCaption: narration is speech whose text is on the page */}
      <audio ref={audioRef} preload="auto" className="hidden" />
    </NarrationContext.Provider>
  )
}
