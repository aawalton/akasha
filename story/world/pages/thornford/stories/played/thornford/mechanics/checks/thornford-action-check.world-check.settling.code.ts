import { bandedSettled } from "akasha/story/world/mechanics/modules/banded-roll/banded-roll.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"

const RESPONSES = {
  strong: "warm",
  success: "as-hoped",
  cost: "twist",
  failure: "twist",
} as const

type Response = (typeof RESPONSES)[keyof typeof RESPONSES]

type Answered = {
  readonly outcome: Response
  readonly total: number
  readonly target: number
  readonly margin: number
}

export type Settled = { readonly answered: Answered } | { readonly refused: string }

export function settled(reading: unknown, roll: Rolled): Settled {
  const banded = bandedSettled(reading, roll)
  if ("refused" in banded) return banded
  const { outcome, total, target, margin } = banded.answered
  return { answered: { outcome: RESPONSES[outcome], total, target, margin } }
}
