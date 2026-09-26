import { heldIntent } from "akasha/story/world/mechanics/modules/action-intent/action-intent.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { theTowerAffinity } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/pages/the-tower-affinity.tower-attunement-rank.ts"
import { theTowerManipulation } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/pages/the-tower-manipulation.tower-attunement-rank.ts"
import { theTowerSoul } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/pages/the-tower-soul.tower-attunement-rank.ts"
import { theTowerSpirit } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/pages/the-tower-spirit.tower-attunement-rank.ts"
import { worked as mentalAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-mental-attack.world-derived-metric.formula.code.ts"
import { elementAt } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/elements/modules/affinity-element/affinity-element.module.code.ts"
import { z } from "zod"

const HERE = "story/world/pages/personas/stories/played/the-tower/mechanics/checks"
const UNTRAINED = 0
const TRAINED = 3
const SAME_ELEMENT = 6
const CLEAN_FROM = 8
const ADEQUATE_FROM = 0
const HELD_AGAINST = 50
const NOT_FOUND = -1

const RANKS: readonly string[] = [
  theTowerAffinity,
  theTowerManipulation,
  theTowerSpirit,
  theTowerSoul,
]
  .toSorted((one, other) => one.cap - other.cap)
  .map((one) => one.slug)

const ABSORBING = z.object({
  element: z.string(),
  held: z.record(z.string(), z.number()),
  intent: z.number(),
  rank: z.string().nullable(),
  trained: z.boolean(),
})

type Band = {
  readonly band: string
  readonly mana: number
  readonly backlash: number
}

const CLEAN: Band = { band: "clean", mana: 9, backlash: 0 }
const ADEQUATE: Band = { band: "adequate", mana: 18, backlash: 0.4 }
const ROUGH: Band = { band: "rough", mana: 30, backlash: 1 }

function bandFor(margin: number): Band {
  if (margin >= CLEAN_FROM) return CLEAN
  if (margin >= ADEQUATE_FROM) return ADEQUATE
  return ROUGH
}

function trainingFor(rank: number | null, trained: boolean): number {
  if (rank === null) return trained ? TRAINED : UNTRAINED
  return SAME_ELEMENT + rank
}

export type Absorption = {
  readonly element: string
  readonly power: number
  readonly intent: number
  readonly rank: number | null
  readonly trained: boolean
}

export type Absorbed = {
  readonly score: number
  readonly margin: number
  readonly band: string
  readonly training: number
  readonly mana: number
  readonly pool: string
  readonly backlash: number
  readonly lingers: string | null
  readonly opens: boolean
}

export type Ran = { readonly answered: Absorbed } | { readonly refused: string }

export function absorbed(absorption: Absorption, roll: Rolled): Ran {
  const element = elementAt(absorption.element)
  if (element === undefined) {
    return { refused: `\`${absorption.element}\` is no element of the Tower, ${HERE}` }
  }
  const training = trainingFor(absorption.rank, absorption.trained)
  const score = absorption.power + training + heldIntent(absorption.intent) + roll.total
  const margin = score - HELD_AGAINST
  const band = bandFor(margin)
  return {
    answered: {
      score,
      margin,
      band: band.band,
      training,
      mana: band.mana,
      pool: element.pool,
      backlash: Math.round(element.backlash * band.backlash),
      lingers: band === ROUGH ? element.lingers : null,
      opens: absorption.rank === null,
    },
  }
}

export function settled(reading: unknown, roll: Rolled): Ran {
  const held = ABSORBING.safeParse(reading)
  if (!held.success) return { refused: `an absorption reads so: ${z.prettifyError(held.error)}` }
  const said = held.data
  const rank = said.rank === null ? null : RANKS.indexOf(said.rank)
  if (rank === NOT_FOUND) return { refused: `\`${said.rank}\` is no rank of the Tower, ${HERE}` }
  const power = mentalAttack({ held: said.held })
  if ("refused" in power) return power
  return absorbed(
    {
      element: said.element,
      power: power.answered,
      intent: said.intent,
      rank,
      trained: said.trained,
    },
    roll
  )
}
