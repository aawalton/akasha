const GATE = 1
const MARGIN_DIVISOR = 12
const CRIT_MARGIN_FLOOR = 6
const CRIT_SCALE = 1.5
const GRAZE_SHORT_BY = -3
const GRAZE_SCALE = 0.25
const DAMAGE_FLOOR = 1
const INTENT_MOST = 10

export type Rolled = {
  readonly total: number
  readonly crit: boolean
  readonly fumble: boolean
}

export type Bonus = {
  readonly from: string
  readonly by: number
}

export type Reading = {
  readonly attackPower: number
  readonly defense: number
  readonly baseDamage: number
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
  const effectiveScore = reading.attackPower + reading.roll.total + added
  const margin = effectiveScore - reading.defense
  const banded = bandedBy(margin, reading.roll)
  const counted = banded.band === "crit" ? Math.max(margin, CRIT_MARGIN_FLOOR) : margin
  const dealt = (reading.baseDamage + counted / MARGIN_DIVISOR) * banded.scale
  return {
    hit: banded.hit,
    band: banded.band,
    gate: GATE,
    intent: Math.min(Math.max(reading.intent, 0), INTENT_MOST),
    margin,
    effectiveScore,
    damage: banded.hit ? Math.max(Math.round(dealt), DAMAGE_FLOOR) : 0,
  }
}
