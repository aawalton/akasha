import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OverwhereISkillCharacter } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/skills/properties/overwhere-i-skill-character.relation-property.types.ts"
import type { OverwhereISkillLevel } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/skills/properties/overwhere-i-skill-level.number-property.types.ts"
import type { OverwhereISkillSkill } from "akasha/story/world/pages/hell-hound-evolution-litrpg/stories/played/overwhere-i/mechanics/skills/properties/overwhere-i-skill-skill.relation-property.types.ts"

export type OverwhereISkill = WorldSkill & {
  character: OverwhereISkillCharacter
  skill: OverwhereISkillSkill
  level: OverwhereISkillLevel
}
