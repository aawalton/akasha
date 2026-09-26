import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import {
  checked,
  MODIFIERS,
  type Settled,
} from "akasha/story/world/mechanics/modules/target-roll/target-roll.module.code.ts"
import { z } from "zod"

const TARGETS = { easy: 8, standard: 12, hard: 16 } as const

const ACT = MODIFIERS.extend({ band: z.enum(["easy", "standard", "hard"]) })

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = ACT.safeParse(reading)
  if (!held.success) return { refused: `an act reads so: ${z.prettifyError(held.error)}` }
  const { band, ...modifiers } = held.data
  return { answered: checked({ ...modifiers, target: TARGETS[band] }, roll) }
}
