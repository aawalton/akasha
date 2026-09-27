import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const TARGETS = { easy: 8, standard: 12, hard: 16, extreme: 20 } as const

const MOST_BONUS = 4

const MOST_BONUSES = 6

const STRONG = 5

const AT_A_COST = -4

const BONUS = z.object({
  from: z.string().trim().min(1),
  by: z.number().int().min(-MOST_BONUS).max(MOST_BONUS),
})

const ACT = z.object({
  band: z.enum(["easy", "standard", "hard", "extreme"]),
  bonuses: z.array(BONUS).default([]),
})

export type Outcome = "strong" | "success" | "cost" | "failure"

export type Checked = {
  readonly succeeded: boolean
  readonly outcome: Outcome
  readonly total: number
  readonly target: number
  readonly margin: number
}

export type Settled = { readonly answered: Checked } | { readonly refused: string }

function outcomeOf(margin: number, roll: Rolled): Outcome {
  if (roll.fumble) return "failure"
  if (roll.crit || margin >= STRONG) return "strong"
  if (margin >= 0) return "success"
  if (margin >= AT_A_COST) return "cost"
  return "failure"
}

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = ACT.safeParse(reading)
  if (!held.success) return { refused: `an act reads so: ${z.prettifyError(held.error)}` }
  const added = held.data.bonuses.reduce((sum, one) => sum + one.by, 0)
  if (Math.abs(added) > MOST_BONUSES) {
    return { refused: `an act's bonuses add to at most ${MOST_BONUSES} either way, not ${added}` }
  }
  const target = TARGETS[held.data.band]
  const total = roll.total + added
  const margin = total - target
  const outcome = outcomeOf(margin, roll)
  return { answered: { succeeded: outcome !== "failure", outcome, total, target, margin } }
}
