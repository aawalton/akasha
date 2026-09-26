import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"
import type { TowerSkillRankWidth } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/properties/tower-skill-rank-width.number-property.types.ts"

export type TowerSkillRank = WorldRank & {
  width?: TowerSkillRankWidth
}
