import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OverwhereIiiSkillCharacter } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/skills/properties/overwhere-iii-skill-character.relation-property.types.ts"
import type { OverwhereIiiSkillLevel } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/skills/properties/overwhere-iii-skill-level.number-property.types.ts"
import type { OverwhereIiiSkillSkill } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/skills/properties/overwhere-iii-skill-skill.relation-property.types.ts"

export type OverwhereIiiSkill = WorldSkill & {
  character: OverwhereIiiSkillCharacter
  skill: OverwhereIiiSkillSkill
  level: OverwhereIiiSkillLevel
}
