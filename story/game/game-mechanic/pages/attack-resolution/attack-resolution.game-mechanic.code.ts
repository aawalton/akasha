import { heldIntent } from "akasha/story/game/game-mechanic/modules/action-intent/action-intent.module.code.ts"
import type { Rolled } from "akasha/story/game/game-mechanic/modules/dice-reading/dice-reading.module.code.ts"
import type { Bonus } from "akasha/story/game/game-mechanic/modules/mechanic-run/mechanic-run.module.code.ts"

const WHOLE = 1
const MARGIN_DIVISOR = 12
const CRIT_MARGIN_FLOOR = 6
const CRIT_SCALE = 1.5
const GRAZE_SHORT_BY = -3
const GRAZE_SCALE = 0.25
const DAMAGE_FLOOR = 1

type Reading = {
  readonly attackPower: number
  readonly defense: number
  readonly baseDamage: number
  readonly gate: number
  readonly intent: number
  readonly roll: Rolled
  readonly bonuses: readonly Bonus[]
}

export type Resolved = {
  readonly hit: boolean
  readonly band: string
  readonly gate: number
  readonly intent: number
  readonly margin: number
  readonly effectiveScore: number
  readonly damage: number
}

type Banded = {
  readonly band: string
  readonly hit: boolean
  readonly scale: number
}

function bandedBy(margin: number, roll: Rolled): Banded {
  if (roll.fumble) return { band: "fumble", hit: false, scale: 0 }
  if (roll.crit) return { band: "crit", hit: true, scale: CRIT_SCALE }
  if (margin >= 0) return { band: "hit", hit: true, scale: 1 }
  if (margin > GRAZE_SHORT_BY) return { band: "graze", hit: true, scale: GRAZE_SCALE }
  return { band: "miss", hit: false, scale: 0 }
}

export function runMechanic(reading: Reading): Resolved {
  const added = reading.bonuses.reduce((sum, one) => sum + one.by, 0)
  const intent = heldIntent(reading.intent)
  const effectiveScore = reading.attackPower + reading.roll.total + added + intent
  const margin = effectiveScore - reading.defense
  const banded = bandedBy(margin, reading.roll)
  const counted = banded.band === "crit" ? Math.max(margin, CRIT_MARGIN_FLOOR) : margin
  const grown = WHOLE + counted / MARGIN_DIVISOR
  const dealt = reading.baseDamage * reading.gate * grown * banded.scale
  return {
    hit: banded.hit,
    band: banded.band,
    gate: reading.gate,
    intent,
    margin,
    effectiveScore,
    damage: banded.hit ? Math.max(Math.round(dealt), DAMAGE_FLOOR) : 0,
  }
}
