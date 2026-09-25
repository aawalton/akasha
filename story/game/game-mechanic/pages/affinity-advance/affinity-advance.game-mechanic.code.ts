import {
  AFFINITY_TIERS,
  tierIndexAt,
} from "akasha/story/game/game-mechanic/modules/affinity-tier/affinity-tier.module.code.ts"

const HERE = "story/game/game-mechanic/pages/affinity-advance"
const PER_EVENT = 1
const PER_ABSORPTION = 2
const MOST_PER_ENCOUNTER = 3
const MOST_PER_COUNT = 4
const FIRST_COUNT = 1
const NONE = 0

const BANDS: readonly { readonly through: number; readonly events: number }[] = [
  { through: 10, events: 1 },
  { through: 25, events: 2 },
  { through: 40, events: 3 },
]

function costOf(count: number): number {
  const band = BANDS.find((one) => count <= one.through)
  return band === undefined ? MOST_PER_COUNT : band.events
}

type Reading = {
  readonly tier: string
  readonly count: number
  readonly pool: number
  readonly deposited: number
  readonly absorbed: boolean
}

type Advanced = {
  readonly tier: string
  readonly count: number
  readonly pool: number
  readonly deposited: number
  readonly gained: number
  readonly promoted: boolean
}

type Ran = { readonly answered: Advanced } | { readonly refused: string }

export function runMechanic(reading: Reading): Ran {
  const at = tierIndexAt(reading.tier)
  if (at === -1) return { refused: `\`${reading.tier}\` is no affinity tier, ${HERE}` }
  const room = Math.max(MOST_PER_ENCOUNTER - reading.deposited, NONE)
  const deposit = Math.min(reading.absorbed ? PER_ABSORPTION : PER_EVENT, room)
  let index = at
  let rank = reading.tier
  let count = reading.count
  let pool = reading.pool + deposit
  let gained = NONE
  let promoted = false
  for (;;) {
    const tier = AFFINITY_TIERS[index]
    if (tier === undefined) break
    if (count >= tier.cap) {
      const above = AFFINITY_TIERS[index + FIRST_COUNT]
      if (above === undefined) break
      index += FIRST_COUNT
      rank = above.rank
      count = FIRST_COUNT
      promoted = true
      continue
    }
    const price = costOf(count + FIRST_COUNT)
    if (pool < price) break
    pool -= price
    count += FIRST_COUNT
    gained += FIRST_COUNT
  }
  return {
    answered: {
      tier: rank,
      count,
      pool,
      deposited: reading.deposited + deposit,
      gained,
      promoted,
    },
  }
}
