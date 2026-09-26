import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const TARGETS = { easy: 8, standard: 12, hard: 16 } as const

const BONUS = z.object({ from: z.string(), by: z.number() })

export const MODIFIERS = z.object({
  attribute: z.number(),
  rank: z.number().default(0),
  bonuses: z.array(BONUS).default([]),
})

const ACT = MODIFIERS.extend({ band: z.enum(["easy", "standard", "hard"]) })

type Bonus = {
  readonly from: string
  readonly by: number
}

export type Act = {
  readonly attribute: number
  readonly rank: number
  readonly bonuses: readonly Bonus[]
  readonly target: number
}

export type Checked = {
  readonly succeeded: boolean
  readonly total: number
  readonly target: number
  readonly margin: number
}

export type Settled = { readonly answered: Checked } | { readonly refused: string }

export function checked(act: Act, roll: Rolled): Checked {
  const added = act.bonuses.reduce((sum, one) => sum + one.by, 0)
  const total = roll.total + act.attribute + act.rank + added
  const margin = total - act.target
  return { succeeded: margin >= 0, total, target: act.target, margin }
}

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = ACT.safeParse(reading)
  if (!held.success) return { refused: `an act reads so: ${z.prettifyError(held.error)}` }
  const { band, ...modifiers } = held.data
  return { answered: checked({ ...modifiers, target: TARGETS[band] }, roll) }
}
