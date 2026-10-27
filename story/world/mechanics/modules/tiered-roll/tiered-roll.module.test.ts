import { expect, test } from "bun:test"
import { actionDifficulty } from "akasha/story/world/mechanics/checks/action-difficulties/action-difficulty.page-type.ts"
import { easy } from "akasha/story/world/mechanics/checks/action-difficulties/pages/easy.action-difficulty.ts"
import { impossible } from "akasha/story/world/mechanics/checks/action-difficulties/pages/impossible.action-difficulty.ts"
import { medium } from "akasha/story/world/mechanics/checks/action-difficulties/pages/medium.action-difficulty.ts"
import { outcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.ts"
import { basicSuccess } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/basic-success.outcome-tier.ts"
import { criticalFailure } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/critical-failure.outcome-tier.ts"
import { criticalSuccess } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/critical-success.outcome-tier.ts"
import { failure } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/failure.outcome-tier.ts"
import { greatSuccess } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/great-success.outcome-tier.ts"
import { mixedResults } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/mixed-results.outcome-tier.ts"
import { success } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/success.outcome-tier.ts"
import {
  type Named,
  tieredSettled,
} from "akasha/story/world/mechanics/modules/tiered-roll/tiered-roll.module.code.ts"

function tier(page: { readonly slug: string }): string {
  return `${outcomeTier.slug}/${page.slug}`
}

function difficulty(page: { readonly slug: string }): string {
  return `${actionDifficulty.slug}/${page.slug}`
}

function rolled(total: number) {
  return { total, crit: total === 180, fumble: total === 3 }
}

function skilled(by: number) {
  return (named: Named) => ({ answered: { from: named.skill ?? named.stat ?? "", by } })
}

const ACT = {
  character: "character-player/mara",
  skill: "Swordplay",
  actionDifficulty: difficulty(medium),
}

function outcomeAt(total: number): unknown {
  const said = tieredSettled(ACT, rolled(total), skilled(0))
  return "answered" in said ? said.answered.outcome : said.refused
}

test("a score of zero is the lowest that succeeds, as Mixed Results", () => {
  expect(outcomeAt(92)).toBe(tier(mixedResults))
  expect(outcomeAt(91)).toBe(tier(failure))
})

test("each tier begins at its score floor", () => {
  expect(outcomeAt(46)).toBe(tier(criticalFailure))
  expect(outcomeAt(47)).toBe(tier(failure))
  expect(outcomeAt(112)).toBe(tier(basicSuccess))
  expect(outcomeAt(132)).toBe(tier(success))
  expect(outcomeAt(152)).toBe(tier(greatSuccess))
  expect(outcomeAt(176)).toBe(tier(greatSuccess))
  expect(outcomeAt(177)).toBe(tier(criticalSuccess))
})

test("the skill, a recent success, the modifiers and the action's difficulty add to the score", () => {
  const act = {
    ...ACT,
    actionDifficulty: difficulty(easy),
    recentSuccess: 10,
    modifiers: [{ from: "Enemy Staggered", by: 5 }],
  }
  expect(tieredSettled(act, rolled(92), skilled(35))).toEqual({
    answered: {
      outcome: tier(greatSuccess),
      succeeded: true,
      score: 70,
      actionDifficulty: difficulty(easy),
      terms: [
        { from: "Swordplay", by: 35 },
        { from: "Recent Similar Success", by: 10 },
        { from: "Enemy Staggered", by: 5 },
      ],
    },
  })
})

test("an impossible action fails whatever the dice, and has no score", () => {
  const act = { ...ACT, actionDifficulty: difficulty(impossible) }
  expect(tieredSettled(act, rolled(180), skilled(50))).toMatchObject({
    answered: { outcome: tier(failure), succeeded: false, score: null },
  })
})

test("a stat takes the place of a skill", () => {
  const act = { character: ACT.character, stat: "Agility", actionDifficulty: ACT.actionDifficulty }
  expect(tieredSettled(act, rolled(92), skilled(12))).toMatchObject({
    answered: { score: 12, terms: [{ from: "Agility", by: 12 }] },
  })
})

test("an act naming both a skill and a stat, or neither, is refused", () => {
  expect(tieredSettled({ ...ACT, stat: "Agility" }, rolled(92), skilled(0))).toHaveProperty(
    "refused"
  )
  const bare = { character: ACT.character, actionDifficulty: ACT.actionDifficulty }
  expect(tieredSettled(bare, rolled(92), skilled(0))).toHaveProperty("refused")
})

test("more than three modifiers, or one outside -10 to 15, is refused", () => {
  const four = [1, 2, 3, 4].map((by) => ({ from: `m${by}`, by }))
  expect(tieredSettled({ ...ACT, modifiers: four }, rolled(92), skilled(0))).toHaveProperty(
    "refused"
  )
  const wide = [{ from: "Huge", by: 16 }]
  expect(tieredSettled({ ...ACT, modifiers: wide }, rolled(92), skilled(0))).toHaveProperty(
    "refused"
  )
})

test("a recent success outside 5 to 15 is refused", () => {
  expect(tieredSettled({ ...ACT, recentSuccess: 4 }, rolled(92), skilled(0))).toHaveProperty(
    "refused"
  )
})

test("an action difficulty the ladder does not have is refused, naming the ladder", () => {
  const said = tieredSettled({ ...ACT, actionDifficulty: medium.slug }, rolled(92), skilled(0))
  expect("refused" in said ? said.refused : "").toContain(difficulty(medium))
})

test("a story's refusal of the skill is the act's refusal", () => {
  const refusing = () => ({ refused: "no such skill" })
  expect(tieredSettled(ACT, rolled(92), refusing)).toEqual({ refused: "no such skill" })
})

test("an act handed no roll is refused, naming the dice to settle it with", () => {
  expect(tieredSettled(ACT, null, skilled(0))).toEqual({
    refused: "an act is rolled, so settle it with --dice 3d60",
  })
})
