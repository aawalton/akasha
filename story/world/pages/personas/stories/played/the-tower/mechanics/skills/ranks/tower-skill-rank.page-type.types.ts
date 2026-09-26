import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"
import type { TowerSkillRankWidth } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/properties/tower-skill-rank-width.number-property.types.ts"

export type TowerSkillRank = WorldMechanic & {
  title: Title
  width?: TowerSkillRankWidth
}
