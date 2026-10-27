import { expect, test } from "bun:test"
import { actionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.ts"
import { medium } from "akasha/story/world/mechanics/checks/action-difficulties/pages/medium.action-difficulty.ts"
import { outcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.ts"
import { greatSuccess } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/great-success.outcome-tier.ts"
import { difficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.ts"
import { normal } from "akasha/story/world/stories/played/difficulty-levels/pages/normal.difficulty-level.ts"
import { veryHard } from "akasha/story/world/stories/played/difficulty-levels/pages/very-hard.difficulty-level.ts"
import { outcomeCardsOf } from "akasha/story/world/stories/played/modules/played-outcomes/played-outcomes.module.code.tsx"

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

test("a tiered line is a card naming its skill, difficulty, outcome and terms by their titles", () => {
  expect(outcomeCardsOf(`${lineAt(normal)}\n`)).toEqual([
    {
      skill: "Swordplay",
      actionDifficulty: medium.title,
      outcome: greatSuccess.title,
      terms: "Swordplay +35, Recent Similar Success +10, Enemy Staggered +5",
    },
  ])
})

test("a story level other than Normal is a term of its own", () => {
  const [card] = outcomeCardsOf(lineAt(veryHard))
  expect(card?.terms).toEndWith(`${veryHard.title} story −${Math.abs(veryHard.oddsModifier)}`)
})

test("a line no tiered roll answered draws no card", () => {
  const untiered = JSON.stringify({ check: "world-check/any", answered: { endsAt: "x" } })
  expect(outcomeCardsOf(`${untiered}\nnot json\n`)).toEqual([])
})
