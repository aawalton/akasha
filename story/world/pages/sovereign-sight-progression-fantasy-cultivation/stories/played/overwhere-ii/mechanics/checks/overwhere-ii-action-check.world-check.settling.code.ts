import {
  bandedSettled,
  type Settled,
} from "akasha/story/world/mechanics/modules/banded-roll/banded-roll.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const ORDINARY_ATTRIBUTE = 6

const MOST_EDGE = 4

const SKILL_STEP = 5

const EDGES = z.object({
  attribute: z.number().int().min(0).optional(),
  skill: z.number().int().min(0).optional(),
})

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = EDGES.safeParse(reading)
  if (!held.success) {
    return { refused: `an act's attribute and skill read so: ${z.prettifyError(held.error)}` }
  }
  const { attribute, skill } = held.data
  const lead = attribute === undefined ? 0 : Math.floor((attribute - ORDINARY_ATTRIBUTE) / 2)
  const fromAttribute = Math.max(-MOST_EDGE, Math.min(MOST_EDGE, lead))
  const fromSkill = skill === undefined ? 0 : Math.min(MOST_EDGE, Math.floor(skill / SKILL_STEP))
  return bandedSettled(reading, { ...roll, total: roll.total + fromAttribute + fromSkill })
}
