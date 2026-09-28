import { bandedSettled } from "akasha/story/world/mechanics/modules/banded-roll/banded-roll.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const MOST_FAILED_BEFORE_COSTS = 4

const CORE_CRACKS_PAST = 8

const NAMED_BONUS = z.object({ from: z.string().trim().min(1), by: z.number().int() })

const A_CULTIVATING_ACT = z.object({
  act: z.enum(["sensing", "step", "new-tier"]),
  failedBefore: z.number().int().min(0).default(0),
  bonuses: z.array(NAMED_BONUS).default([]),
})

type Climbed = {
  readonly outcome: "strong" | "success" | "cost" | "failure"
  readonly woke: boolean
  readonly rises: boolean
  readonly backlash: "none" | "light" | "solid"
  readonly coreCracked: boolean
}

type Settled = { readonly answered: Climbed } | { readonly refused: string }

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = A_CULTIVATING_ACT.safeParse(reading)
  if (!held.success) {
    return { refused: `an act of cultivating reads so: ${z.prettifyError(held.error)}` }
  }
  const { act, failedBefore, bonuses } = held.data
  const penalty = Math.min(failedBefore, MOST_FAILED_BEFORE_COSTS)
  const every = penalty > 0 ? [...bonuses, { from: "failed before", by: -penalty }] : bonuses
  const band = act === "new-tier" ? "extreme" : "hard"
  const rolled = bandedSettled({ band, bonuses: every }, roll)
  if ("refused" in rolled) return rolled
  const { outcome, margin } = rolled.answered
  const cameOff = outcome !== "failure"
  if (act === "sensing") {
    return {
      answered: { outcome, woke: cameOff, rises: false, backlash: "none", coreCracked: false },
    }
  }
  const backlash = outcome === "cost" ? "light" : outcome === "failure" ? "solid" : "none"
  return {
    answered: {
      outcome,
      woke: false,
      rises: cameOff,
      backlash,
      coreCracked: outcome === "failure" && margin < -CORE_CRACKS_PAST,
    },
  }
}
