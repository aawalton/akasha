import { namedAs, slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { towerSkillRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/tower-skill-rank.page-type.ts"

const HERE = "story/world/pages/personas/stories/played/the-tower/mechanics/skills/modules/advance"
const ALPHA = 0.5
const FIRST_LEVEL = 1
const ONE = 1
const NONE = 0

export type Rank = { readonly slug: string; readonly width?: number }

type Rung = { readonly slug: string; readonly width: number | null }

type Placed = { readonly at: number; readonly rung: Rung }

type Reading = {
  readonly rank: string
  readonly level: number
  readonly demonstrations: number
  readonly shown: string
}

type Advanced = {
  readonly rank: string
  readonly level: number
  readonly demonstrations: number
  readonly gained: number
  readonly promoted: boolean
}

type Ran = { readonly answered: Advanced } | { readonly refused: string }

function climbOrder(one: Rung, two: Rung): number {
  if (one.width === null) return two.width === null ? NONE : ONE
  if (two.width === null) return -ONE
  return one.width - two.width
}

export function ladderOf(ranks: readonly Rank[]): readonly Rung[] {
  return ranks.map((one) => ({ slug: one.slug, width: one.width ?? null })).sort(climbOrder)
}

export function placedOn(ladder: readonly Rung[], named: string): Placed | undefined {
  const slug = slugIn(named)
  const at = ladder.findIndex((one) => one.slug === slug)
  const rung = ladder[at]
  return rung === undefined ? undefined : { at, rung }
}

export function rankNamed(slug: string): string {
  return namedAs(towerSkillRank.slug, slug, null)
}

export function advance(ranks: readonly Rank[], reading: Reading): Ran {
  const ladder = ladderOf(ranks)
  const placed = placedOn(ladder, reading.rank)
  if (placed === undefined) {
    return { refused: `\`${reading.rank}\` is no rank a skill climbs, ${HERE}` }
  }
  const shown = placedOn(ladder, reading.shown)
  if (shown === undefined) {
    return { refused: `\`${reading.shown}\` is no rank a skill climbs, ${HERE}` }
  }
  const target = placed.at + ONE
  const demonstrations = shown.at >= target ? reading.demonstrations + ONE : reading.demonstrations
  const held = {
    rank: rankNamed(placed.rung.slug),
    level: reading.level,
    demonstrations,
    gained: NONE,
    promoted: false,
  }
  if (shown.at < placed.at) return { answered: held }
  const width = placed.rung.width
  const above = ladder[target]
  if (width === null || above === undefined) {
    return { answered: { ...held, level: reading.level + ONE, gained: ONE } }
  }
  const rolled = Math.round(reading.level + ALPHA * (width - reading.level))
  if (rolled < width || demonstrations < target) {
    const level = Math.min(rolled, width - ONE)
    return { answered: { ...held, level, gained: Math.max(level - reading.level, NONE) } }
  }
  return {
    answered: {
      rank: rankNamed(above.slug),
      level: FIRST_LEVEL,
      demonstrations: NONE,
      gained: ONE,
      promoted: true,
    },
  }
}
