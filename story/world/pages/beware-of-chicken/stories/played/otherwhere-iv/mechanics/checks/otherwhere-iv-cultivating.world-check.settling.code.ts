import {
  type Settled as BandedSettled,
  bandedSettled,
} from "akasha/story/world/mechanics/modules/banded-roll/banded-roll.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const MOST_ONE_BONUS = 4

const MOST_BONUS = 6

const LASTING_MISS = 8

const ACT = z.object({
  kind: z.enum(["sensing", "opening", "breakthrough"]),
  newRealm: z.boolean().default(false),
  bonus: z.number().int().min(-MOST_BONUS).max(MOST_BONUS).default(0),
})

type Act = z.infer<typeof ACT>

type Outcome = Extract<BandedSettled, { readonly answered: unknown }>["answered"]["outcome"]

type Cultivated = {
  readonly outcome: Outcome
  readonly rises: boolean
  readonly deviation: boolean
  readonly lasting: boolean
}

type Settled = { readonly answered: Cultivated } | { readonly refused: string }

function bonusesOf(bonus: number): { from: string; by: number }[] {
  const bonuses = []
  let left = bonus
  while (left !== 0) {
    const by = Math.sign(left) * Math.min(MOST_ONE_BONUS, Math.abs(left))
    bonuses.push({ from: "cultivating", by })
    left -= by
  }
  return bonuses
}

export function cultivatingSettled(roll: Rolled, act: Act): Settled {
  const band = act.kind === "breakthrough" && act.newRealm ? "extreme" : "hard"
  const checked = bandedSettled({ band, bonuses: bonusesOf(act.bonus) }, roll)
  if ("refused" in checked) return checked
  const { outcome, margin } = checked.answered
  const climbing = act.kind !== "sensing"
  return {
    answered: {
      outcome,
      rises: climbing && outcome !== "failure",
      deviation: climbing && (outcome === "cost" || outcome === "failure"),
      lasting: climbing && outcome === "failure" && margin < -LASTING_MISS,
    },
  }
}

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = ACT.safeParse(reading)
  if (!held.success)
    return { refused: `a cultivating act reads so: ${z.prettifyError(held.error)}` }
  return cultivatingSettled(roll, held.data)
}
