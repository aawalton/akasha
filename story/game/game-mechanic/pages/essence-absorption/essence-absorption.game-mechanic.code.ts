import { heldIntent } from "akasha/story/game/game-mechanic/modules/action-intent/action-intent.module.code.ts"
import { elementAt } from "akasha/story/game/game-mechanic/modules/affinity-element/affinity-element.module.code.ts"
import { tierIndexAt } from "akasha/story/game/game-mechanic/modules/affinity-tier/affinity-tier.module.code.ts"
import type { Rolled } from "akasha/story/game/game-mechanic/modules/dice-reading/dice-reading.module.code.ts"
import type { Sheet } from "akasha/story/game/game-mechanic/modules/linear-stat/linear-stat.module.code.ts"
import { runMechanic as mentAtk } from "akasha/story/game/game-mechanic/pages/ment-atk/ment-atk.game-mechanic.code.ts"

const HERE = "story/game/game-mechanic/pages/essence-absorption"
const UNTRAINED = 0
const TRAINED = 3
const SAME_ELEMENT = 6
const CLEAN_FROM = 8
const ADEQUATE_FROM = 0
const HELD_AGAINST = 50

type Band = {
  readonly band: string
  readonly focus: number
  readonly backlash: number
}

const CLEAN: Band = { band: "clean", focus: 9, backlash: 0 }
const ADEQUATE: Band = { band: "adequate", focus: 18, backlash: 0.4 }
const ROUGH: Band = { band: "rough", focus: 30, backlash: 1 }

function bandFor(margin: number): Band {
  if (margin >= CLEAN_FROM) return CLEAN
  if (margin >= ADEQUATE_FROM) return ADEQUATE
  return ROUGH
}

function trainingFor(tier: string | null, trained: boolean): number | null {
  if (tier === null) return trained ? TRAINED : UNTRAINED
  const at = tierIndexAt(tier)
  return at === -1 ? null : SAME_ELEMENT + at
}

export type Reading = {
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
  const element = elementAt(reading.element)
  if (element === undefined) {
    return { refused: `\`${reading.element}\` is no element an affinity is of, ${HERE}` }
  }
  const training = trainingFor(reading.tier, reading.trained)
  if (training === null) return { refused: `\`${reading.tier}\` is no affinity tier, ${HERE}` }
  const power = mentAtk({ held: reading.held })
  if ("refused" in power) return power
  const score = power.answered + training + heldIntent(reading.intent) + reading.roll.total
  const margin = score - HELD_AGAINST
  const band = bandFor(margin)
  return {
    answered: {
      score,
      margin,
      band: band.band,
      training,
      focus: band.focus,
      pool: element.pool,
      backlash: Math.round(element.backlash * band.backlash),
      lingers: band === ROUGH ? element.lingers : null,
      opens: reading.tier === null,
    },
  }
}
