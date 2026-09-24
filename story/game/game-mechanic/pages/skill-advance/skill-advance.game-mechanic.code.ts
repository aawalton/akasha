import {
  placedAt,
  SKILL_RUNGS,
} from "akasha/story/game/game-mechanic/modules/skill-rung/skill-rung.module.code.ts"

const HERE = "story/game/game-mechanic/pages/skill-advance"
const ALPHA = 0.5
const FIRST_LEVEL = 1
const ONE = 1
const NONE = 0

export type Reading = {
  readonly rank: string
  readonly level: number
  readonly demos: number
  readonly shown: string
}

export type Advanced = {
  readonly rank: string
  readonly level: number
  readonly demos: number
  readonly gained: number
  readonly promoted: boolean
}

export type Ran = { readonly answered: Advanced } | { readonly refused: string }

export function runMechanic(reading: Reading): Ran {
  const placed = placedAt(reading.rank)
  if (placed === undefined) {
    return { refused: `\`${reading.rank}\` is no rung a skill climbs, ${HERE}` }
  }
  const shown = placedAt(reading.shown)
  if (shown === undefined) {
    return { refused: `\`${reading.shown}\` is no rung a skill climbs, ${HERE}` }
  }
  const target = placed.at + ONE
  const demos = shown.at >= target ? reading.demos + ONE : reading.demos
  const held = {
    rank: placed.rung.rank,
    level: reading.level,
    demos,
    gained: NONE,
    promoted: false,
  }
  if (shown.at < placed.at) return { answered: held }
  const width = placed.rung.width
  const above = SKILL_RUNGS[target]
  if (width === null || above === undefined) {
    return { answered: { ...held, level: reading.level + ONE, gained: ONE } }
  }
  const rolled = Math.round(reading.level + ALPHA * (width - reading.level))
  if (rolled < width || demos < target) {
    const level = Math.min(rolled, width - ONE)
    return { answered: { ...held, level, gained: Math.max(level - reading.level, NONE) } }
  }
  return {
    answered: { rank: above.rank, level: FIRST_LEVEL, demos: NONE, gained: ONE, promoted: true },
  }
}
