"use client"

import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
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
import { useEffect, useState } from "react"

const ID_KEY = "id"

const OUTCOMES_KEY = "outcomes"

const ANSWERED = "answered"

const LEVEL = "difficultyLevel"

const BREAK = "\n"

const ROWS_PARTED_BY = " "

const MINUS = "−"

const JOINED = ", "

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

export type OutcomeCard = {
  readonly skill: string
  readonly actionDifficulty: string
  readonly outcome: string
  readonly terms: string
}

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

function cardOf(line: string): OutcomeCard | null {
  let read: unknown
  try {
    read = JSON.parse(line)
  } catch {
    return null
  }
  if (!isRecord(read)) return null
  const answered = read[ANSWERED]
  if (!isRecord(answered)) return null
  const outcome = answered["outcome"]
  const difficulty = answered["actionDifficulty"]
  if (typeof outcome !== "string" || typeof difficulty !== "string") return null
  const terms = termsIn(answered["terms"])
  const said = terms.map((one) => `${one.from} ${signed(one.by)}`)
  const level = levelTerm(read[LEVEL])
  return {
    skill: terms[0]?.from ?? "",
    actionDifficulty: titleOf(difficulty),
    outcome: titleOf(outcome),
    terms: [...said, ...(level === null ? [] : [level])].join(JOINED),
  }
}

export function outcomeCardsOf(text: string): readonly OutcomeCard[] {
  return text
    .split(BREAK)
    .filter((one) => one.trim() !== "")
    .flatMap((one) => {
      const card = cardOf(one)
      return card === null ? [] : [card]
    })
}

type Cards = ReadonlyMap<string, readonly OutcomeCard[]>

const NO_CARDS: Cards = new Map()

async function readOutcomes(pageTypeSlug: string, ids: readonly string[]): Promise<Cards | null> {
  const asked = await askedLoudly({
    "page-type": pageTypeSlug,
    where: { id: { in: [...ids] } },
    keys: [ID_KEY, OUTCOMES_KEY],
    files: [OUTCOMES_KEY],
  })
  if (!asked.ok) return null
  const held = new Map<string, readonly OutcomeCard[]>()
  for (const row of asked.answer.rows) {
    const id = row.values[ID_KEY]
    const text = row.values[OUTCOMES_KEY]
    if (typeof id !== "string" || typeof text !== "string") continue
    const cards = outcomeCardsOf(text)
    if (cards.length > 0) held.set(id, cards)
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

export function OutcomeCards({ cards }: { readonly cards: readonly OutcomeCard[] | undefined }) {
  if (cards === undefined || cards.length === 0) return null
  return (
    <div className="flex flex-col gap-2">
      {cards.map((card, place) => (
        <div key={`${place}:${card.outcome}`} className={`rounded-lg px-4 py-3 ${surfaceClass(1)}`}>
          <p className="text-tertiary text-xs">
            ({card.skill} · {card.actionDifficulty})
          </p>
          <p className="font-semibold text-sm">{card.outcome}</p>
          {card.terms === "" ? null : <p className="text-secondary text-xs">{card.terms}</p>}
        </div>
      ))}
    </div>
  )
}
