import { tierIndexAt } from "akasha/story/game/game-mechanic/modules/affinity-tier/affinity-tier.module.code.ts"

const HERE = "story/game/game-mechanic/pages/affinity-bias"
const NONE = 0
const FIRST_TIER_ADDS = 1

type Reading = {
  readonly tier: string
  readonly matched: boolean
}

type Biased = { readonly answered: { readonly intent: number } } | { readonly refused: string }

export function runMechanic(reading: Reading): Biased {
  const at = tierIndexAt(reading.tier)
  if (at === -1) return { refused: `\`${reading.tier}\` is no affinity tier, ${HERE}` }
  return { answered: { intent: reading.matched ? at + FIRST_TIER_ADDS : NONE } }
}
