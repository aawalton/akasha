import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OtherwhereIxSkillCharacter } from "akasha/story/world/pages/mana-devourer-litrpgmana-cultivation/stories/played/otherwhere-ix/mechanics/system-skills/properties/otherwhere-ix-skill-character.relation-property.types.ts"
import type { OtherwhereIxSkillLevel } from "akasha/story/world/pages/mana-devourer-litrpgmana-cultivation/stories/played/otherwhere-ix/mechanics/system-skills/properties/otherwhere-ix-skill-level.number-property.types.ts"

export type OtherwhereIxSkill = WorldSkill & {
  character: OtherwhereIxSkillCharacter
  level: OtherwhereIxSkillLevel
}
