import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"
import type { TowerSkillRankWidth } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/properties/tower-skill-rank-width.number-property.types.ts"

export type TowerSkillRank = Mechanic & {
  title: Title
  width?: TowerSkillRankWidth
}
