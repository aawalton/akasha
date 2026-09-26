import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import {
  type Resolved,
  struck,
} from "akasha/story/world/mechanics/modules/strike-resolution/strike-resolution.module.code.ts"
import { z } from "zod"

const BASE = 1
const NO_GATE = 1

const ACT = z.object({
  attribute: z.number(),
  difficulty: z.number(),
  intent: z.number(),
})

export type Act = {
  readonly attribute: number
  readonly difficulty: number
  readonly intent: number
}

type Settled = { readonly answered: Resolved } | { readonly refused: string }

export function checked(act: Act, roll: Rolled): Resolved {
  return struck(
    {
      attackPower: act.attribute,
      defence: act.difficulty,
      baseDamage: BASE,
      gate: NO_GATE,
      intent: act.intent,
      bonuses: [],
    },
    roll
  )
}

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = ACT.safeParse(reading)
  if (!held.success) return { refused: `an act reads so: ${z.prettifyError(held.error)}` }
  return { answered: checked(held.data, roll) }
}
