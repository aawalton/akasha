import type { AttunementRank } from "akasha/story/mechanic/attunement/rank/attunement-rank.page-type.types.ts"
import type { TowerAttunementBias } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/properties/tower-attunement-bias.number-property.types.ts"

export type TowerAttunementRank = AttunementRank & {
  bias: TowerAttunementBias
}
