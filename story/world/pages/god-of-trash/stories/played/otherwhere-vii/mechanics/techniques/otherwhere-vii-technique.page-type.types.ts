import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OtherwhereViiTechniqueCharacter } from "akasha/story/world/pages/god-of-trash/stories/played/otherwhere-vii/mechanics/techniques/properties/otherwhere-vii-technique-character.relation-property.types.ts"
import type { OtherwhereViiTechniqueSkill } from "akasha/story/world/pages/god-of-trash/stories/played/otherwhere-vii/mechanics/techniques/properties/otherwhere-vii-technique-skill.relation-property.types.ts"

export type OtherwhereViiTechnique = WorldSkill & {
  character: OtherwhereViiTechniqueCharacter
  skill: OtherwhereViiTechniqueSkill
}
