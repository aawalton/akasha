import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import type { Resolved } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/checks/tower-attack-resolution.world-check.settling.code.ts"
import { checked } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/checks/tower-attribute-check.world-check.settling.code.ts"

type Reading = {
  readonly attribute: number
  readonly difficulty: number
  readonly intent: number
  readonly roll: Rolled
}

export function runMechanic(reading: Reading): Resolved {
  return checked(
    { attribute: reading.attribute, difficulty: reading.difficulty, intent: reading.intent },
    reading.roll
  )
}
