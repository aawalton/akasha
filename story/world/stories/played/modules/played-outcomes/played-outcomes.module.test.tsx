import { expect, test } from "bun:test"
import { color } from "akasha/design/interface/color/color.page-type.ts"
import { purple } from "akasha/design/interface/color/pages/purple.color.ts"
import { actionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.ts"
import { medium } from "akasha/story/world/mechanics/checks/action-difficulties/pages/medium.action-difficulty.ts"
import { outcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.ts"
import { greatSuccess } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/great-success.outcome-tier.ts"
import { difficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.ts"
import { normal } from "akasha/story/world/stories/played/difficulty-levels/pages/normal.difficulty-level.ts"
import { veryHard } from "akasha/story/world/stories/played/difficulty-levels/pages/very-hard.difficulty-level.ts"
import {
  actorsIn,
  cardsPlacedOf,
  namesIn,
  outcomeCardsOf,
  startsIn,
} from "akasha/story/world/stories/played/modules/played-outcomes/played-outcomes.module.code.tsx"

const TERMS = [
  { from: "Swordplay", by: 35 },
  { from: "Recent Similar Success", by: 10 },
  { from: "Enemy Staggered", by: 5 },
]

function lineAt(level: { readonly slug: string; readonly oddsModifier: number }): string {
  return JSON.stringify({
    check: "world-check/any",
    difficultyLevel: { level: `${difficultyLevel.slug}/${level.slug}`, by: level.oddsModifier },
    answered: {
      outcome: `${outcomeTier.slug}/${greatSuccess.slug}`,
      succeeded: true,
      score: 70,
      actionDifficulty: `${actionDifficulty.slug}/${medium.slug}`,
      terms: TERMS,
    },
  })
}

const GREAT = `${outcomeTier.slug}/${greatSuccess.slug}`

test("a tiered line is a card naming its skill, difficulty, outcome and terms by their titles", () => {
  expect(outcomeCardsOf(`${lineAt(normal)}\n`)).toEqual([
    {
      actor: null,
      action: null,
      skill: "Swordplay",
      actionDifficulty: medium.title,
      outcome: greatSuccess.title,
      tier: GREAT,
      terms: "Swordplay +35, Recent Similar Success +10, Enemy Staggered +5",
      rollKey: null,
    },
  ])
})

const NALA = "character-player/nala"

function acted(): string {
  const read = JSON.parse(lineAt(normal))
  return JSON.stringify({ ...read, reading: { character: NALA }, action: "I leap", seed: "s1" })
}

test("a card carries the action its line states and the actor its reading names", () => {
  const nala = { name: "Nala", color: `${color.slug}/${purple.slug}` }
  const [card] = outcomeCardsOf(acted(), new Set(), new Map([[NALA, nala]]))
  expect(card?.action).toBe("I leap")
  expect(card?.actor).toEqual(nala)
  expect(actorsIn(`${acted()}\n${acted()}\n`)).toEqual([NALA])
})

test("a turn's card rolls by its seed, and a chapter's card never rolls", () => {
  const onTurn = cardsPlacedOf(acted(), null).get(0)?.[0]
  expect(onTurn?.rollKey).toBe("s1")
  const chaptered = JSON.stringify({ ...JSON.parse(acted()), turn: 2 })
  const onChapter = cardsPlacedOf(chaptered, startsIn([{ position: 2, paragraph: 0 }]))
  expect(onChapter.get(0)?.[0]?.rollKey).toBeNull()
})

test("a story level other than Normal is a term of its own", () => {
  const [card] = outcomeCardsOf(lineAt(veryHard))
  expect(card?.terms).toEndWith(`${veryHard.title} story −${Math.abs(veryHard.oddsModifier)}`)
})

test("a turn's cards are drawn before its first paragraph", () => {
  const placed = cardsPlacedOf(lineAt(normal), null)
  expect([...placed.keys()]).toEqual([0])
})

test("a chapter's cards are drawn before the paragraph their own turn starts at", () => {
  const first = JSON.stringify({ ...JSON.parse(lineAt(normal)), turn: 3 })
  const second = JSON.stringify({ ...JSON.parse(lineAt(normal)), turn: 8 })
  const placed = cardsPlacedOf(
    `${first}\n${second}\n`,
    startsIn([
      { position: 3, paragraph: 0 },
      { position: 8, paragraph: 14 },
    ])
  )
  expect([...placed.entries()].map(([at, cards]) => [at, cards.length])).toEqual([
    [0, 1],
    [14, 1],
  ])
})

test("a chapter line naming no turn it kept a start for draws no card", () => {
  const unturned = cardsPlacedOf(lineAt(normal), startsIn([{ position: 8, paragraph: 14 }]))
  expect(unturned.size).toBe(0)
})

const SWORDPLAY = "character-skill/ana-swordplay"

function namingSkill(skill: string): string {
  return JSON.stringify({ ...JSON.parse(lineAt(normal)), reading: { skill } })
}

test("a line names the skill or stat its reading named", () => {
  const stat = JSON.stringify({ ...JSON.parse(lineAt(normal)), reading: { stat: "a-stat/ana" } })
  expect(namesIn(`${namingSkill(SWORDPLAY)}\n${stat}\n${lineAt(normal)}\n`)).toEqual([
    SWORDPLAY,
    "a-stat/ana",
  ])
})

test("a card leaves out the skill and its term where that skill's page is unrevealed", () => {
  expect(outcomeCardsOf(namingSkill(SWORDPLAY), new Set([SWORDPLAY]))).toEqual([
    {
      actor: null,
      action: null,
      skill: "",
      actionDifficulty: medium.title,
      outcome: greatSuccess.title,
      tier: GREAT,
      terms: "Recent Similar Success +10, Enemy Staggered +5",
      rollKey: null,
    },
  ])
})

test("a card keeps a skill whose page is revealed", () => {
  const [card] = outcomeCardsOf(namingSkill(SWORDPLAY), new Set(["character-skill/other"]))
  expect(card?.skill).toBe("Swordplay")
  expect(card?.terms).toStartWith("Swordplay +35")
})

test("a line no tiered roll answered draws no card", () => {
  const untiered = JSON.stringify({ check: "world-check/any", answered: { endsAt: "x" } })
  expect(outcomeCardsOf(`${untiered}\nnot json\n`)).toEqual([])
})
