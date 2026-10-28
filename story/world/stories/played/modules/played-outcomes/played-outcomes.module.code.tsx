"use client"

import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"

import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import type { PageWatch } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"
import { FILE_BACKING_POLL_MS } from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"
import { getPagesStore } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { actionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.ts"
import { easy } from "akasha/story/world/mechanics/checks/action-difficulties/pages/easy.action-difficulty.ts"
import { extremelyHard } from "akasha/story/world/mechanics/checks/action-difficulties/pages/extremely-hard.action-difficulty.ts"
import { hard } from "akasha/story/world/mechanics/checks/action-difficulties/pages/hard.action-difficulty.ts"
import { impossible } from "akasha/story/world/mechanics/checks/action-difficulties/pages/impossible.action-difficulty.ts"
import { medium } from "akasha/story/world/mechanics/checks/action-difficulties/pages/medium.action-difficulty.ts"
import { simple } from "akasha/story/world/mechanics/checks/action-difficulties/pages/simple.action-difficulty.ts"
import { somewhatHard } from "akasha/story/world/mechanics/checks/action-difficulties/pages/somewhat-hard.action-difficulty.ts"
import { veryHard } from "akasha/story/world/mechanics/checks/action-difficulties/pages/very-hard.action-difficulty.ts"
import { outcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.ts"
import { basicSuccess } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/basic-success.outcome-tier.ts"
import { criticalFailure } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/critical-failure.outcome-tier.ts"
import { criticalSuccess } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/critical-success.outcome-tier.ts"
import { failure } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/failure.outcome-tier.ts"
import { greatSuccess } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/great-success.outcome-tier.ts"
import { mixedResults } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/mixed-results.outcome-tier.ts"
import { success } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/success.outcome-tier.ts"
import { chapterTurnStarts } from "akasha/story/world/stories/played/chapters/properties/chapter-turn-starts.record-property.ts"
import { turnStartParagraph } from "akasha/story/world/stories/played/chapters/properties/turn-start-paragraph.number-property.ts"
import { storyChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.ts"
import { difficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.ts"
import { easy as easyLevel } from "akasha/story/world/stories/played/difficulty-levels/pages/easy.difficulty-level.ts"
import { hard as hardLevel } from "akasha/story/world/stories/played/difficulty-levels/pages/hard.difficulty-level.ts"
import { normal } from "akasha/story/world/stories/played/difficulty-levels/pages/normal.difficulty-level.ts"
import { veryEasy } from "akasha/story/world/stories/played/difficulty-levels/pages/very-easy.difficulty-level.ts"
import { veryHard as veryHardLevel } from "akasha/story/world/stories/played/difficulty-levels/pages/very-hard.difficulty-level.ts"
import {
  askedLoudly,
  reportThrown,
} from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"
import {
  type OutcomeCard,
  OutcomeCards,
} from "akasha/story/world/stories/played/modules/played-outcome-card/played-outcome-card.module.code.tsx"
import {
  type Actors,
  actorsOf,
  unrevealedOf,
} from "akasha/story/world/stories/played/modules/played-outcome-naming/played-outcome-naming.module.code.ts"
import { type ReactNode, useEffect, useState } from "react"

const ID_KEY = "id"

const OUTCOMES_KEY = "outcomes"

const ANSWERED = "answered"

const LEVEL = "difficultyLevel"

const TURN = "turn"

const STARTS_KEY = exportedAs(chapterTurnStarts.propertySlug)

const POSITION = "position"

const PARAGRAPH = exportedAs(turnStartParagraph.propertySlug)

const FIRST_PARAGRAPH = 0

const BREAK = "\n"

const ROWS_PARTED_BY = " "

const MINUS = "−"

const JOINED = ", "

const READING = "reading"

const NAMED_KEYS = ["skill", "stat"] as const

const SEED = "seed"

const ACTION = "action"

const CHARACTER = "character"

const NONE_UNREVEALED: ReadonlySet<string> = new Set()

const NO_ACTORS: Actors = new Map()

type Titled = { readonly slug: string; readonly title: string }

function titlesOf(type: string, pages: readonly Titled[]): ReadonlyMap<string, string> {
  return new Map(pages.map((one) => [`${type}/${one.slug}`, one.title]))
}

const TITLES = new Map([
  ...titlesOf(outcomeTier.slug, [
    criticalFailure,
    failure,
    mixedResults,
    basicSuccess,
    success,
    greatSuccess,
    criticalSuccess,
  ]),
  ...titlesOf(actionDifficulty.slug, [
    simple,
    easy,
    medium,
    somewhatHard,
    hard,
    veryHard,
    extremelyHard,
    impossible,
  ]),
  ...titlesOf(difficultyLevel.slug, [veryEasy, easyLevel, normal, hardLevel, veryHardLevel]),
])

function titleOf(address: string): string {
  return TITLES.get(address) ?? address
}

function signed(by: number): string {
  return by < 0 ? `${MINUS}${Math.abs(by)}` : `+${by}`
}

function termsIn(value: unknown): readonly { readonly from: string; readonly by: number }[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((one: unknown) =>
    isRecord(one) && typeof one["from"] === "string" && typeof one["by"] === "number"
      ? [{ from: one["from"], by: one["by"] }]
      : []
  )
}

function levelTerm(value: unknown): string | null {
  if (!isRecord(value) || typeof value["level"] !== "string") return null
  const by = value["by"]
  if (typeof by !== "number" || by === 0) return null
  return `${titleOf(value["level"])} story ${signed(by)}`
}

type Lined = { readonly card: OutcomeCard; readonly turn: number | null }

type Read = Readonly<Record<string, unknown>>

function readsOf(text: string): readonly Read[] {
  return text
    .split(BREAK)
    .filter((one) => one.trim() !== "")
    .flatMap((one) => {
      try {
        const read: unknown = JSON.parse(one)
        return isRecord(read) ? [read] : []
      } catch {
        return []
      }
    })
}

function namedIn(read: Read): string | null {
  const reading = read[READING]
  if (!isRecord(reading)) return null
  for (const key of NAMED_KEYS) {
    const said = reading[key]
    if (typeof said === "string") return said
  }
  return null
}

export function namesIn(text: string): readonly string[] {
  return [
    ...new Set(
      readsOf(text).flatMap((one) => {
        const named = namedIn(one)
        return named === null ? [] : [named]
      })
    ),
  ]
}

function actorIn(read: Read): string | null {
  const reading = read[READING]
  return isRecord(reading) ? textIn(reading[CHARACTER]) : null
}

export function actorsIn(text: string): readonly string[] {
  return [...new Set(readsOf(text).flatMap((one) => actorIn(one) ?? []))]
}

function linedOf(read: Read, unrevealed: ReadonlySet<string>, actors: Actors): Lined | null {
  const answered = read[ANSWERED]
  if (!isRecord(answered)) return null
  const outcome = answered["outcome"]
  const difficulty = answered["actionDifficulty"]
  if (typeof outcome !== "string" || typeof difficulty !== "string") return null
  const all = termsIn(answered["terms"])
  const named = namedIn(read)
  const hidden = named !== null && unrevealed.has(named)
  const terms = hidden ? all.slice(1) : all
  const said = terms.map((one) => `${one.from} ${signed(one.by)}`)
  const level = levelTerm(read[LEVEL])
  const turn = read[TURN]
  const actor = actorIn(read)
  return {
    card: {
      actor: actor === null ? null : (actors.get(actor) ?? null),
      action: textIn(read[ACTION]),
      skill: hidden ? "" : (all[0]?.from ?? ""),
      actionDifficulty: titleOf(difficulty),
      outcome: titleOf(outcome),
      tier: outcome,
      terms: [...said, ...(level === null ? [] : [level])].join(JOINED),
      rollKey: textIn(read[SEED]),
    },
    turn: typeof turn === "number" ? turn : null,
  }
}

function linesOf(text: string, unrevealed: ReadonlySet<string>, actors: Actors): readonly Lined[] {
  return readsOf(text).flatMap((one) => {
    const lined = linedOf(one, unrevealed, actors)
    return lined === null ? [] : [lined]
  })
}

export function outcomeCardsOf(
  text: string,
  unrevealed: ReadonlySet<string> = NONE_UNREVEALED,
  actors: Actors = NO_ACTORS
): readonly OutcomeCard[] {
  return linesOf(text, unrevealed, actors).map((one) => one.card)
}

export type PlacedCards = ReadonlyMap<number, readonly OutcomeCard[]>

export function cardsPlacedOf(
  text: string,
  starts: ReadonlyMap<number, number> | null,
  unrevealed: ReadonlySet<string> = NONE_UNREVEALED,
  actors: Actors = NO_ACTORS
): PlacedCards {
  const placed = new Map<number, OutcomeCard[]>()
  for (const one of linesOf(text, unrevealed, actors)) {
    const at = starts === null ? FIRST_PARAGRAPH : starts.get(one.turn ?? Number.NaN)
    if (at === undefined) continue
    const card = starts === null ? one.card : { ...one.card, rollKey: null }
    placed.set(at, [...(placed.get(at) ?? []), card])
  }
  return placed
}

export function startsIn(value: unknown): ReadonlyMap<number, number> {
  const starts = new Map<number, number>()
  if (!Array.isArray(value)) return starts
  for (const one of value) {
    if (!isRecord(one)) continue
    const position = one[POSITION]
    const paragraph = one[PARAGRAPH]
    if (typeof position === "number" && typeof paragraph === "number") {
      starts.set(position, paragraph)
    }
  }
  return starts
}

type Cards = ReadonlyMap<string, PlacedCards>

const NO_CARDS: Cards = new Map()

async function readOutcomes(pageTypeSlug: string, ids: readonly string[]): Promise<Cards | null> {
  const chaptered = pageTypeSlug === storyChapterPlayed.slug
  const asked = await askedLoudly({
    "page-type": pageTypeSlug,
    where: { id: { in: [...ids] } },
    keys: chaptered ? [ID_KEY, OUTCOMES_KEY, STARTS_KEY] : [ID_KEY, OUTCOMES_KEY],
    files: [OUTCOMES_KEY],
  })
  if (!asked.ok) return null
  const texts = asked.answer.rows.flatMap((row) => textIn(row.values[OUTCOMES_KEY]) ?? [])
  const [unrevealed, actors] = await Promise.all([
    unrevealedOf(texts.flatMap(namesIn)),
    actorsOf(texts.flatMap(actorsIn)),
  ])
  const held = new Map<string, PlacedCards>()
  for (const row of asked.answer.rows) {
    const id = row.values[ID_KEY]
    const text = row.values[OUTCOMES_KEY]
    if (typeof id !== "string" || typeof text !== "string") continue
    const starts = chaptered ? startsIn(row.values[STARTS_KEY]) : null
    const cards = cardsPlacedOf(text, starts, unrevealed, actors)
    if (cards.size > 0) held.set(id, cards)
  }
  return held
}

export function usePlayedOutcomes(pageTypeSlug: string | null, ids: readonly string[]): Cards {
  const asked = ids.join(ROWS_PARTED_BY)
  const [cards, setCards] = useState<Cards>(NO_CARDS)

  useEffect(() => {
    if (pageTypeSlug === null || asked === "") {
      setCards(NO_CARDS)
      return
    }
    let alive = true
    let asking = false
    let owed = false
    const named = asked.split(ROWS_PARTED_BY)
    const ask = (): undefined => {
      if (asking) {
        owed = true
        return undefined
      }
      asking = true
      void readOutcomes(pageTypeSlug, named)
        .catch((thrown: unknown) => {
          reportThrown(`reading the outcomes of ${pageTypeSlug}`, thrown)
          return null
        })
        .then((said) => {
          asking = false
          if (!alive) return
          if (said !== null) setCards(said)
          if (owed) {
            owed = false
            ask()
          }
        })
      return undefined
    }
    ask()
    let watches: readonly PageWatch[] = []
    void getPagesStore().then((store) => {
      if (alive) watches = named.map((id) => store.watchPage(pageTypeSlug, id, ask))
    })
    const timer = setInterval(() => {
      if (!watches.every((one) => one.live())) ask()
    }, FILE_BACKING_POLL_MS)
    return () => {
      alive = false
      clearInterval(timer)
      for (const one of watches) one.release()
    }
  }, [pageTypeSlug, asked])

  return cards
}

export function cardsBefore(
  placed: PlacedCards | undefined
): ReadonlyMap<number, ReactNode> | undefined {
  if (placed === undefined) return undefined
  return new Map(
    [...placed.entries()].map(([at, cards]) => [at, <OutcomeCards key={at} cards={cards} />])
  )
}
