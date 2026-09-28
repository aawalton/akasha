import {
  bandedSettled,
  type Settled,
} from "akasha/story/world/mechanics/modules/banded-roll/banded-roll.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"

export function settled(reading: unknown, roll: Rolled): Settled {
  return bandedSettled(reading, roll)
}
