import { namedAs, slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { towerSkillRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/tower-skill-rank.page-type.ts"

const HERE = "story/world/pages/personas/stories/played/the-tower/mechanics/skills/modules/advance"
const ALPHA = 0.5
const FIRST_LEVEL = 1
const FIRST_PLACE = 1
const ONE = 1
const NONE = 0

export type Rank = { readonly slug: string; readonly place: number; readonly width?: number }

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

export function rankIn(ranks: readonly Rank[], named: string): Rank | undefined {
  const slug = slugIn(named)
  return ranks.find((one) => one.slug === slug)
}

export function placesAboveFirst(rank: Rank): number {
  return rank.place - FIRST_PLACE
}

export function rankNamed(slug: string): string {
  return namedAs(towerSkillRank.slug, slug, null)
}

export function advance(ranks: readonly Rank[], reading: Reading): Ran {
  const placed = rankIn(ranks, reading.rank)
  if (placed === undefined) {
    return { refused: `\`${reading.rank}\` is no rank a skill climbs, ${HERE}` }
  }
  const shown = rankIn(ranks, reading.shown)
  if (shown === undefined) {
    return { refused: `\`${reading.shown}\` is no rank a skill climbs, ${HERE}` }
  }
  const demonstrations =
    shown.place > placed.place ? reading.demonstrations + ONE : reading.demonstrations
  const held = {
    rank: rankNamed(placed.slug),
    level: reading.level,
    demonstrations,
    gained: NONE,
    promoted: false,
  }
  if (shown.place < placed.place) return { answered: held }
  const width = placed.width
  const above = ranks.find((one) => one.place === placed.place + ONE)
  if (width === undefined || above === undefined) {
    return { answered: { ...held, level: reading.level + ONE, gained: ONE } }
  }
  const rolled = Math.round(reading.level + ALPHA * (width - reading.level))
  if (rolled < width || demonstrations < placesAboveFirst(above)) {
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
