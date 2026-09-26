import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { PartnersSkillCharacter } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/properties/partners-skill-character.relation-property.types.ts"
import type { PartnersSkillRank } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/properties/partners-skill-rank.number-property.types.ts"
import type { PartnersSkillSkill } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/properties/partners-skill-skill.relation-property.types.ts"
import type { PartnersSkillUses } from "akasha/story/world/pages/personas/stories/played/partners/mechanics/skills/properties/partners-skill-uses.number-property.types.ts"

export type PartnersSkill = WorldSkill & {
  character: PartnersSkillCharacter
  skill: PartnersSkillSkill
  rank?: PartnersSkillRank
  uses?: PartnersSkillUses
}
