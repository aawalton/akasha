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
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

export const TIERED_DICE = "3d60"

const CENTRE = 92

const MOST_MODIFIERS = 3

const LEAST_MODIFIER = -10

const MOST_MODIFIER = 15

const LEAST_RECENT = 5

const MOST_RECENT = 15

const RECENT = "Recent Similar Success"

const DIFFICULTIES = [simple, easy, medium, somewhatHard, hard, veryHard, extremelyHard, impossible]

const TIERS = [
  criticalFailure,
  failure,
  mixedResults,
  basicSuccess,
  success,
  greatSuccess,
  criticalSuccess,
]

type Tier = { readonly slug: string; readonly floor: number | null; readonly succeeds: boolean }

const BANDED: readonly Tier[] = TIERS.map((one) => ({
  slug: one.slug,
  floor: "scoreFloor" in one ? one.scoreFloor : null,
  succeeds: one.succeeds,
})).toSorted(
  (a, b) => (b.floor ?? Number.NEGATIVE_INFINITY) - (a.floor ?? Number.NEGATIVE_INFINITY)
)

export type Term = { readonly from: string; readonly by: number }

export type Named = { readonly skill?: string; readonly stat?: string }

export type Termed = (named: Named) => { readonly answered: Term } | { readonly refused: string }

type Tiered = {
  readonly outcome: string
  readonly succeeded: boolean
  readonly score: number | null
  readonly actionDifficulty: string
  readonly terms: readonly Term[]
}

export type Settled = { readonly answered: Tiered } | { readonly refused: string }

const TERM = z.object({
  from: z.string().trim().min(1),
  by: z.number().int().min(LEAST_MODIFIER).max(MOST_MODIFIER),
})

const ACT = z.object({
  character: z.string().min(1),
  skill: z.string().min(1).optional(),
  stat: z.string().min(1).optional(),
  actionDifficulty: z.string().min(1),
  modifiers: z.array(TERM).max(MOST_MODIFIERS).default([]),
  recentSuccess: z.number().int().min(LEAST_RECENT).max(MOST_RECENT).optional(),
})

function addressOf(type: string, slug: string): string {
  return `${type}/${slug}`
}

function tierOf(score: number | null): Tier {
  const lowest = BANDED.at(-1) as Tier
  if (score === null) return BANDED.find((one) => one.slug === failure.slug) ?? lowest
  return BANDED.find((one) => one.floor !== null && score >= one.floor) ?? lowest
}

function difficultyNamed(said: string) {
  return DIFFICULTIES.find((one) => addressOf(actionDifficulty.slug, one.slug) === said)
}

function namedOnce(named: Named): string | null {
  if ((named.skill === undefined) === (named.stat === undefined)) {
    return "an act names one `skill` or one `stat`, never both and never neither"
  }
  return null
}

export function tieredSettled(reading: unknown, roll: Rolled | null, termOf: Termed): Settled {
  if (roll === null) return { refused: `an act is rolled, so settle it with --dice ${TIERED_DICE}` }
  const held = ACT.safeParse(reading)
  if (!held.success) return { refused: `an act reads so: ${z.prettifyError(held.error)}` }
  const act = held.data
  const twice = namedOnce(act)
  if (twice !== null) return { refused: twice }
  const difficulty = difficultyNamed(act.actionDifficulty)
  if (difficulty === undefined) {
    const named = DIFFICULTIES.map((one) => addressOf(actionDifficulty.slug, one.slug)).join(", ")
    return { refused: `\`${act.actionDifficulty}\` is no action difficulty; say one of ${named}` }
  }
  const skilled = termOf({
    ...(act.skill === undefined ? {} : { skill: act.skill }),
    ...(act.stat === undefined ? {} : { stat: act.stat }),
  })
  if ("refused" in skilled) return skilled
  const recent = act.recentSuccess === undefined ? [] : [{ from: RECENT, by: act.recentSuccess }]
  const terms = [skilled.answered, ...recent, ...act.modifiers]
  const modifier = "oddsModifier" in difficulty ? difficulty.oddsModifier : null
  const added = terms.reduce((sum, one) => sum + one.by, 0)
  const score = modifier === null ? null : roll.total - CENTRE + modifier + added
  const tier = tierOf(score)
  return {
    answered: {
      outcome: addressOf(outcomeTier.slug, tier.slug),
      succeeded: tier.succeeds,
      score,
      actionDifficulty: act.actionDifficulty,
      terms,
    },
  }
}
