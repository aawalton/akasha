"use client"

import { asNumber } from "akasha/code/type/narrowing/modules/as-number/as-number.module.code.ts"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { usePlayedOutcomes } from "akasha/story/world/stories/played/modules/played-outcomes/played-outcomes.module.code.tsx"
import {
  PLAYED_CHAPTER_PAGE_TYPE_SLUG,
  PLAYED_TURN_PAGE_TYPE_SLUG,
  playedTail,
  playedTurnsOf,
} from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"
import {
  type PlayedProse,
  usePlayedProse,
} from "akasha/story/world/stories/played/modules/prose-beside/prose-beside.module.code.ts"
import { type ReactNode, useLayoutEffect, useMemo, useRef, useState } from "react"

const SHOW_PREVIOUS = "Show Previous"

const LOADING = "Loading…"

const CONTROL = "flex justify-center"

const NONE_ASKED = 0

type Cards = ReturnType<typeof usePlayedOutcomes>

type Anchor = { readonly at: Element | null; readonly top: number; readonly count: number }

function topOf(at: Element | null): number {
  return at === null ? 0 : at.getBoundingClientRect().top
}

function byPosition(one: Page, two: Page): number {
  const left = asNumber(one.position) ?? Number.POSITIVE_INFINITY
  const right = asNumber(two.position) ?? Number.POSITIVE_INFINITY
  return left - right
}

export function chaptersBefore(
  chapters: readonly Page[],
  runIsTurns: boolean,
  earlier: number
): readonly Page[] {
  const ordered = [...chapters].sort(byPosition)
  return runIsTurns ? ordered : ordered.slice(0, earlier)
}

export function previousShown(before: readonly Page[], asked: number): readonly Page[] {
  if (asked <= NONE_ASKED) return []
  return before.slice(Math.max(0, before.length - asked))
}

function turnsRead(rows: readonly Page[], prose: PlayedProse): readonly ClientStoryTurn[] {
  return playedTurnsOf(
    rows.filter((row) => prose.read.has(row.id)),
    prose.prose
  )
}

function idsOf(rows: readonly Page[]): readonly string[] {
  return rows.map((row) => row.id)
}

export function usePlayedRun(ready: readonly Page[], chapters: readonly Page[]) {
  const runIsTurns = ready.length > 0
  const runPageTypeSlug = runIsTurns ? PLAYED_TURN_PAGE_TYPE_SLUG : PLAYED_CHAPTER_PAGE_TYPE_SLUG
  const tail = useMemo(
    () => playedTail(runIsTurns ? ready : chapters),
    [runIsTurns, ready, chapters]
  )
  const drawnIds = useMemo(() => idsOf(tail.drawn), [tail])
  const prose = usePlayedProse(runPageTypeSlug, drawnIds)
  const cards = usePlayedOutcomes(runPageTypeSlug, drawnIds)
  const before = useMemo(
    () => chaptersBefore(chapters, runIsTurns, tail.earlier),
    [chapters, runIsTurns, tail]
  )
  const [asked, setAsked] = useState(NONE_ASKED)
  const previous = useMemo(() => previousShown(before, asked), [before, asked])
  const previousIds = useMemo(() => idsOf(previous), [previous])
  const previousProse = usePlayedProse(PLAYED_CHAPTER_PAGE_TYPE_SLUG, previousIds)
  const previousCards = usePlayedOutcomes(PLAYED_CHAPTER_PAGE_TYPE_SLUG, previousIds)
  const turns = useMemo(
    () => [...turnsRead(previous, previousProse), ...turnsRead(tail.drawn, prose)],
    [previous, previousProse, tail, prose]
  )
  const outcomeCards = useMemo<Cards>(
    () => new Map([...previousCards, ...cards]),
    [previousCards, cards]
  )
  const drawnBefore = previous.filter((row) => previousProse.read.has(row.id)).length
  const anchor = useRef<Anchor | null>(null)
  const controlAt = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const held = anchor.current
    if (held === null || drawnBefore < held.count) return
    anchor.current = null
    window.scrollBy(0, topOf(held.at) - held.top)
  }, [drawnBefore])

  const loading = drawnBefore < previous.length
  const press = () => {
    if (loading) return
    const at = controlAt.current?.nextElementSibling?.firstElementChild ?? null
    anchor.current = { at, top: topOf(at), count: previous.length + 1 }
    setAsked((held) => held + 1)
  }
  const control: ReactNode =
    previous.length < before.length || loading ? (
      <div ref={controlAt} className={CONTROL}>
        <Button type="button" variant="tertiary" size="sm" disabled={loading} onClick={press}>
          {loading ? LOADING : SHOW_PREVIOUS}
        </Button>
      </div>
    ) : null

  return { runIsTurns, runPageTypeSlug, tail, turns, outcomeCards, control }
}
