import {
  ladderOf,
  placedOn,
  type Rank,
} from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/modules/advance/tower-skill-advance.module.code.ts"

const HERE = "story/world/pages/personas/stories/played/the-tower/mechanics/skills/modules/bonus"

type Reading = {
  readonly skill: string
  readonly rank: string
}

type Bonus = { readonly from: string; readonly by: number }

type Added = { readonly answered: Bonus } | { readonly refused: string }

export function bonusOf(ranks: readonly Rank[], reading: Reading): Added {
  const placed = placedOn(ladderOf(ranks), reading.rank)
  if (placed === undefined) {
    return { refused: `\`${reading.rank}\` is no rank a skill climbs, ${HERE}` }
  }
  return { answered: { from: reading.skill, by: placed.at } }
}
