import type { Skill } from "akasha/story/mechanic/skill/skill.page-type.types.ts"
import type { RankOfTowerSkill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/properties/rank-of-tower-skill.relation-property.types.ts"
import type { TowerSkillAxis } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/properties/tower-skill-axis.text-property.types.ts"
import type { TowerSkillDemonstrations } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/properties/tower-skill-demonstrations.number-property.types.ts"
import type { TowerSkillElement } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/properties/tower-skill-element.relation-property.types.ts"
import type { TowerSkillLevel } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/properties/tower-skill-level.number-property.types.ts"

export type TowerSkill = Skill & {
  rank: RankOfTowerSkill
  level: TowerSkillLevel
  demonstrations: TowerSkillDemonstrations
  axis?: TowerSkillAxis
  element?: TowerSkillElement
}
