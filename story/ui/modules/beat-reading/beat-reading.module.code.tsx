"use client"

import type { BeatChange } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import {
  type Beats,
  beatsIn,
} from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import {
  OPENING,
  type Scene,
  stepped,
} from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"
import { ChapterProse } from "akasha/story/ui/modules/chapter-prose/chapter-prose.module.code.tsx"
import {
  type InlineCover,
  InlineCoverFigure,
} from "akasha/story/ui/modules/inline-cover/inline-cover.module.code.tsx"
import type { RerollAsker } from "akasha/story/ui/modules/scene-cover-panel/scene-cover-panel.module.code.tsx"
import { proseSegmentsOf } from "akasha/story/ui/modules/session-envelope/session-envelope.module.code.ts"
import type { SubmitPlayerAction } from "akasha/story/ui/modules/system-choice-card/system-choice-card.module.code.tsx"
import type { BeatOverlay } from "akasha/story/world/stories/played/modules/beat-overlay/beat-overlay.module.code.ts"
import { NO_OVERLAY } from "akasha/story/world/stories/played/modules/beat-overlay/beat-overlay.module.code.ts"
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

const FIRST = 0

const ONE = 1

const THRESHOLD = 0.35

const NO_KEYS: readonly string[] = []

const NO_BASE: ReadonlyMap<string, Readonly<Record<string, unknown>>> = new Map()

const OPENING_CAST: Scene = { ...OPENING, place: "" }

const NO_BEATS: readonly Beats[] = []

const PARTED = "/"

type Page = {
  readonly made: number | null
  readonly changes: readonly BeatChange[]
  readonly keys: readonly string[]
}

type Written = { made: number | null; changes: BeatChange[]; keys: string[] }

function pagesOf(beats: Beats): ReadonlyMap<string, Page> {
  const pages = new Map<string, Written>()
  for (const change of beats.changes) {
    const held = pages.get(change.page) ?? { made: null, changes: [], keys: [] }
    pages.set(change.page, held)
    held.changes.push(change)
    if (change.key !== undefined && !held.keys.includes(change.key)) held.keys.push(change.key)
    if (change.make !== undefined) {
      held.made = change.beat
      for (const key of Object.keys(change.make)) if (!held.keys.includes(key)) held.keys.push(key)
    }
  }
  return pages
}

function madeValue(page: Page, key: string, beat: number): unknown {
  let value: unknown
  for (const change of page.changes) {
    if (change.beat > beat) break
    if (change.make !== undefined) {
      value = change.make[key]
      continue
    }
    if (change.key !== key) continue
    value =
      change.append === undefined
        ? change.to
        : [...(Array.isArray(value) ? value : []), change.append]
  }
  return value
}

function stripLast(value: unknown, times: number): unknown {
  return Array.isArray(value) ? value.slice(0, Math.max(FIRST, value.length - times)) : value
}

function atBeat(page: Page, key: string, current: unknown, beat: number): unknown {
  const mine = page.changes.filter((one) => one.key === key)
  const first = mine[FIRST]
  if (first === undefined) return current
  if (first.append !== undefined) {
    const after = mine.filter((one) => one.beat > beat).length
    return stripLast(current, after)
  }
  let value: unknown = first.from
  for (const change of mine) {
    if (change.beat > beat) break
    value = change.to
  }
  return value
}

export function baseOf(
  each: readonly Beats[]
): ReadonlyMap<string, Readonly<Record<string, unknown>>> {
  const pages = new Map<string, Record<string, unknown>>()
  for (const beats of each) {
    for (const change of beats.changes) {
      if (change.make !== undefined) {
        pages.set(change.page, { ...change.make })
        continue
      }
      if (change.key === undefined) continue
      const held = pages.get(change.page) ?? {}
      pages.set(change.page, held)
      const now = held[change.key]
      held[change.key] =
        change.append === undefined
          ? change.to
          : [...(Array.isArray(now) ? now : []), change.append]
    }
  }
  return pages
}

export function presentAt(beats: Beats, beat: number): readonly string[] {
  let state = OPENING_CAST
  for (const scene of beats.scenes) {
    if (scene.beat > beat) break
    const next = stepped(state, scene, `beat ${String(scene.beat)}`)
    if ("refused" in next) break
    state = next
  }
  return state.present
}

export function useBeatsFiles(hrefs: readonly string[]): readonly Beats[] {
  const keyed = hrefs.join(" ")
  const [held, setHeld] = useState<readonly Beats[]>(NO_BEATS)
  useEffect(() => {
    const wanted = keyed === "" ? [] : keyed.split(" ")
    if (wanted.length === 0) {
      setHeld(NO_BEATS)
      return
    }
    let live = true
    void (async () => {
      const found = await Promise.all(
        wanted.map(async (href): Promise<Beats | null> => {
          try {
            const answer = await fetch(href)
            if (!answer.ok) return null
            const read = beatsIn(await answer.text())
            return "refused" in read ? null : read
          } catch {
            return null
          }
        })
      )
      if (live) setHeld(found.flatMap((one) => (one === null ? [] : [one])))
    })()
    return () => {
      live = false
    }
  }, [keyed])
  return held
}

export function overlayOf(
  beats: Beats,
  beat: number,
  base: ReadonlyMap<string, Readonly<Record<string, unknown>>> = NO_BASE
): BeatOverlay {
  if (beats.changes.length === 0 && base.size === 0) return NO_OVERLAY
  const pages = pagesOf(beats)
  return {
    knows: (page) => pages.has(page) || base.has(page),
    shows: (page) => {
      const held = pages.get(page)
      return held === undefined || held.made === null || held.made <= beat
    },
    keysOf: (page) => {
      const mine = pages.get(page)?.keys ?? NO_KEYS
      const theirs = base.get(page)
      if (theirs === undefined) return mine
      const all = [...mine]
      for (const key of Object.keys(theirs)) if (!all.includes(key)) all.push(key)
      return all
    },
    valueOf: (page, key, current) => {
      const held = pages.get(page)
      if (held?.keys.includes(key) === true) {
        return held.made === null ? atBeat(held, key, current, beat) : madeValue(held, key, beat)
      }
      const theirs = base.get(page)?.[key]
      return theirs === undefined ? current : theirs
    },
  }
}

export function coversOn(beats: Beats, beat: number): readonly InlineCover[] {
  return (beats.pictured ?? [])
    .filter((one) => one.beat === beat)
    .map((one, at) => ({
      id: `${String(beat)}${PARTED}${String(at + ONE)}`,
      number: beat,
      cover: one.cover,
      after: one.coverAfter,
    }))
}

export type BeatReading = {
  readonly reading: boolean
  readonly beats: Beats
  readonly ready: boolean
  readonly beat: number
  readonly register: (beat: number, at: HTMLElement | null) => void
}

function registering(): undefined {
  return undefined
}

const Reading = createContext<BeatReading>({
  reading: false,
  beats: { beats: [], scenes: [], changes: [], memory: [] },
  ready: true,
  beat: FIRST,
  register: registering,
})

export function useBeatReading(): BeatReading {
  return useContext(Reading)
}

export function BeatReadingProvider({
  beats,
  ready,
  children,
}: {
  beats: Beats
  ready: boolean
  children: ReactNode
}) {
  const [beat, setBeat] = useState(FIRST)
  const blocks = useRef(new Map<number, HTMLElement>())
  const register = useCallback((at: number, one: HTMLElement | null) => {
    if (one === null) blocks.current.delete(at)
    else blocks.current.set(at, one)
  }, [])
  useEffect(() => {
    const read = () => {
      const line = window.innerHeight * THRESHOLD
      let seen = FIRST
      for (const [at, one] of blocks.current) {
        if (at > seen && one.getBoundingClientRect().top <= line) seen = at
      }
      setBeat(seen)
    }
    read()
    window.addEventListener("scroll", read, { passive: true })
    window.addEventListener("resize", read)
    return () => {
      window.removeEventListener("scroll", read)
      window.removeEventListener("resize", read)
    }
  }, [])
  const value = useMemo<BeatReading>(
    () => ({ reading: true, beats, ready, beat, register }),
    [beats, ready, beat, register]
  )
  return <Reading.Provider value={value}>{children}</Reading.Provider>
}

type BeatProseProps = {
  readonly beats: Beats
  readonly muted: boolean
  readonly asker?: RerollAsker | undefined
  readonly gameExternalId?: string
  readonly submitPlayerAction: SubmitPlayerAction
  readonly signedOutNotice: ReactNode
  readonly under?: readonly InlineCover[]
}

export function BeatProse({
  beats,
  muted,
  asker,
  gameExternalId,
  submitPlayerAction,
  signedOutNotice,
  under,
}: BeatProseProps) {
  const { register } = useBeatReading()
  return (
    <>
      {beats.beats.map((_event, index) => {
        const beat = index + ONE
        const told = beats.prose?.find((one) => one.beat === beat)?.prose ?? ""
        return (
          <div key={beat} ref={(at) => register(beat, at)}>
            <ChapterProse
              text={told}
              segments={proseSegmentsOf(told)}
              covers={coversOn(beats, beat)}
              asker={asker}
              muted={muted}
              gameExternalId={gameExternalId}
              submitPlayerAction={submitPlayerAction}
              signedOutNotice={signedOutNotice}
            />
          </div>
        )
      })}
      {(under ?? []).map((one) => (
        <InlineCoverFigure key={one.id} shown={one} asker={asker} />
      ))}
    </>
  )
}
