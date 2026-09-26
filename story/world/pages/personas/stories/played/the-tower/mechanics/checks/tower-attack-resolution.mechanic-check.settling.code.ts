import { heldIntent } from "akasha/story/mechanic/modules/action-intent/action-intent.module.code.ts"
import type { Rolled } from "akasha/story/mechanic/modules/dice-reading/dice-reading.module.code.ts"
import { z } from "zod"

const WHOLE = 1
const MARGIN_DIVISOR = 12
const CRIT_MARGIN_FLOOR = 6
const CRIT_SCALE = 1.5
const GRAZE_SHORT_BY = -3
const GRAZE_SCALE = 0.25
const DAMAGE_FLOOR = 1

const BONUS = z.object({ from: z.string(), by: z.number() })

const STRIKE = z.object({
  attackPower: z.number(),
  defence: z.number(),
  baseDamage: z.number(),
  gate: z.number(),
  intent: z.number(),
  bonuses: z.array(BONUS).default([]),
})

type Bonus = {
  readonly from: string
  readonly by: number
}

export type Strike = {
  readonly attackPower: number
  readonly defence: number
  readonly baseDamage: number
  readonly gate: number
  readonly intent: number
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

type Settled = { readonly answered: Resolved } | { readonly refused: string }

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

export function struck(strike: Strike, roll: Rolled): Resolved {
  const added = strike.bonuses.reduce((sum, one) => sum + one.by, 0)
  const intent = heldIntent(strike.intent)
  const effectiveScore = strike.attackPower + roll.total + added + intent
  const margin = effectiveScore - strike.defence
  const banded = bandedBy(margin, roll)
  const counted = banded.band === "crit" ? Math.max(margin, CRIT_MARGIN_FLOOR) : margin
  const grown = WHOLE + counted / MARGIN_DIVISOR
  const dealt = strike.baseDamage * strike.gate * grown * banded.scale
  return {
    hit: banded.hit,
    band: banded.band,
    gate: strike.gate,
    intent,
    margin,
    effectiveScore,
    damage: banded.hit ? Math.max(Math.round(dealt), DAMAGE_FLOOR) : 0,
  }
}

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = STRIKE.safeParse(reading)
  if (!held.success) return { refused: `a strike reads so: ${z.prettifyError(held.error)}` }
  return { answered: struck(held.data, roll) }
}
