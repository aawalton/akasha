import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import {
  checked,
  MODIFIERS,
  type Settled,
} from "akasha/story/world/pages/personas/stories/played/partners/mechanics/checks/partners-check.world-check.settling.code.ts"
import { z } from "zod"

const AGAINST_TARGET = MODIFIERS.extend({ target: z.number() })

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = AGAINST_TARGET.safeParse(reading)
  if (!held.success) {
    return { refused: `an act against its target reads so: ${z.prettifyError(held.error)}` }
  }
  return { answered: checked(held.data, roll) }
}
