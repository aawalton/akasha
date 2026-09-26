import { tierIndexAt } from "akasha/story/game/game-mechanic/modules/affinity-tier/affinity-tier.module.code.ts"
import { runMechanic as mentAtk } from "akasha/story/game/game-mechanic/pages/ment-atk/ment-atk.game-mechanic.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import type { Sheet } from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { absorbed } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/checks/tower-essence-absorption.world-check.settling.code.ts"

const HERE = "story/game/game-mechanic/pages/essence-absorption"
const NOT_FOUND = -1
const TOWER = "the-tower-"

const POOLS_BEFORE: Readonly<Record<string, string>> = {
  health: "hp",
  mana: "focus",
  stamina: "stamina",
}

type Reading = {
  readonly element: string
  readonly held: Sheet
  readonly intent: number
  readonly roll: Rolled
  readonly tier: string | null
  readonly trained: boolean
}

export type Absorbed = {
  readonly score: number
  readonly margin: number
  readonly band: string
  readonly training: number
  readonly focus: number
  readonly pool: string
  readonly backlash: number
  readonly lingers: string | null
  readonly opens: boolean
}

export type Ran = { readonly answered: Absorbed } | { readonly refused: string }

export function runMechanic(reading: Reading): Ran {
  const rank = reading.tier === null ? null : tierIndexAt(reading.tier)
  if (rank === NOT_FOUND) return { refused: `\`${reading.tier}\` is no affinity tier, ${HERE}` }
  const power = mentAtk({ held: reading.held })
  if ("refused" in power) return power
  const ran = absorbed(
    {
      element: `${TOWER}${reading.element}`,
      power: power.answered,
      intent: reading.intent,
      rank,
      trained: reading.trained,
    },
    reading.roll
  )
  if ("refused" in ran) return ran
  const { mana, pool, ...rest } = ran.answered
  return { answered: { ...rest, focus: mana, pool: POOLS_BEFORE[pool] ?? pool } }
}
