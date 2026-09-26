import { tierIndexAt } from "akasha/story/game/game-mechanic/modules/affinity-tier/affinity-tier.module.code.ts"
import { runMechanic as mentAtk } from "akasha/story/game/game-mechanic/pages/ment-atk/ment-atk.game-mechanic.code.ts"
import type { Rolled } from "akasha/story/mechanic/modules/dice-reading/dice-reading.module.code.ts"
import type { Sheet } from "akasha/story/mechanic/modules/linear-stat/linear-stat.module.code.ts"
import {
  absorbed,
  type Ran,
} from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/checks/tower-essence-absorption.mechanic-check.settling.code.ts"

const HERE = "story/game/game-mechanic/pages/essence-absorption"
const NOT_FOUND = -1
const TOWER = "the-tower-"

type Reading = {
  readonly element: string
  readonly held: Sheet
  readonly intent: number
  readonly roll: Rolled
  readonly tier: string | null
  readonly trained: boolean
}

export function runMechanic(reading: Reading): Ran {
  const rank = reading.tier === null ? null : tierIndexAt(reading.tier)
  if (rank === NOT_FOUND) return { refused: `\`${reading.tier}\` is no affinity tier, ${HERE}` }
  const power = mentAtk({ held: reading.held })
  if ("refused" in power) return power
  return absorbed(
    {
      element: `${TOWER}${reading.element}`,
      power: power.answered,
      intent: reading.intent,
      rank,
      trained: reading.trained,
    },
    reading.roll
  )
}
