"use client"

import type { BeatChange } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { ChapterProse } from "akasha/story/ui/modules/chapter-prose/chapter-prose.module.code.tsx"
import type { InlineCover } from "akasha/story/ui/modules/inline-cover/inline-cover.module.code.tsx"
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

function stripLast(value: unknown): unknown {
  return Array.isArray(value) ? value.slice(0, -ONE) : value
}

function unwound(page: Page, key: string, current: unknown, beat: number): unknown {
  let value = current
  for (let at = page.changes.length - ONE; at >= FIRST; at -= ONE) {
    const change = page.changes[at]
    if (change === undefined || change.beat <= beat) break
    if (change.key !== key) continue
    value = change.append === undefined ? change.from : stripLast(value)
  }
  return value
}

export function overlayOf(beats: Beats, beat: number): BeatOverlay {
  if (beats.changes.length === 0) return NO_OVERLAY
  const pages = pagesOf(beats)
  return {
    shows: (page) => {
      const held = pages.get(page)
      return held === undefined || held.made === null || held.made <= beat
    },
    keysOf: (page) => pages.get(page)?.keys ?? NO_KEYS,
    valueOf: (page, key, current) => {
      const held = pages.get(page)
      if (held === undefined) return current
      return held.made === null ? unwound(held, key, current, beat) : madeValue(held, key, beat)
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
  readonly overlay: BeatOverlay
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
  overlay: NO_OVERLAY,
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
  const overlay = useMemo(() => overlayOf(beats, beat), [beats, beat])
  const value = useMemo<BeatReading>(
    () => ({ reading: true, beats, ready, beat, overlay, register }),
    [beats, ready, beat, overlay, register]
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
}

export function BeatProse({
  beats,
  muted,
  asker,
  gameExternalId,
  submitPlayerAction,
  signedOutNotice,
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
    </>
  )
}
