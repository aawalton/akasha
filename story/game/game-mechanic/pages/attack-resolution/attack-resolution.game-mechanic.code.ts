import type { Bonus } from "akasha/story/game/game-mechanic/modules/mechanic-run/mechanic-run.module.code.ts"
import type { Rolled } from "akasha/story/mechanic/modules/dice-reading/dice-reading.module.code.ts"
import {
  type Resolved,
  struck,
} from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/checks/tower-attack-resolution.mechanic-check.settling.code.ts"

type Reading = {
  readonly attackPower: number
  readonly defense: number
  readonly baseDamage: number
  readonly gate: number
  readonly intent: number
  readonly roll: Rolled
  readonly bonuses: readonly Bonus[]
}

export function runMechanic(reading: Reading): Resolved {
  return struck(
    {
      attackPower: reading.attackPower,
      defence: reading.defense,
      baseDamage: reading.baseDamage,
      gate: reading.gate,
      intent: reading.intent,
      bonuses: reading.bonuses,
    },
    reading.roll
  )
}
