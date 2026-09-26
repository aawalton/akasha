import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { PartnersIiSkillCharacter } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/properties/partners-ii-skill-character.relation-property.types.ts"
import type { PartnersIiSkillRank } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/properties/partners-ii-skill-rank.number-property.types.ts"
import type { PartnersIiSkillSkill } from "akasha/story/world/pages/personas/stories/played/partners-ii/mechanics/skills/properties/partners-ii-skill-skill.relation-property.types.ts"

export type PartnersIiSkill = WorldSkill & {
  character: PartnersIiSkillCharacter
  skill: PartnersIiSkillSkill
  rank?: PartnersIiSkillRank
}
