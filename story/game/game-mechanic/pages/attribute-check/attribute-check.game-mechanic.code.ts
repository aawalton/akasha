import type { Rolled } from "akasha/story/game/game-mechanic/modules/dice-reading/dice-reading.module.code.ts"
import {
  type Resolved,
  runMechanic as struck,
} from "akasha/story/game/game-mechanic/pages/attack-resolution/attack-resolution.game-mechanic.code.ts"

const BASE = 1
const NO_GATE = 1

type Reading = {
  readonly attribute: number
  readonly difficulty: number
  readonly intent: number
  readonly roll: Rolled
}

export function runMechanic(reading: Reading): Resolved {
  return struck({
    attackPower: reading.attribute,
    defense: reading.difficulty,
    baseDamage: BASE,
    gate: NO_GATE,
    intent: reading.intent,
    bonuses: [],
    roll: reading.roll,
  })
}
