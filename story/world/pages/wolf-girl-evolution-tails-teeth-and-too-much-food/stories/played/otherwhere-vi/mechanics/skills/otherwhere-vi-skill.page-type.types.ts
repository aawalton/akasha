import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OtherwhereViSkillCharacter } from "akasha/story/world/pages/wolf-girl-evolution-tails-teeth-and-too-much-food/stories/played/otherwhere-vi/mechanics/skills/properties/otherwhere-vi-skill-character.relation-property.types.ts"
import type { OtherwhereViSkillLevel } from "akasha/story/world/pages/wolf-girl-evolution-tails-teeth-and-too-much-food/stories/played/otherwhere-vi/mechanics/skills/properties/otherwhere-vi-skill-level.number-property.types.ts"
import type { OtherwhereViSkillStaminaCost } from "akasha/story/world/pages/wolf-girl-evolution-tails-teeth-and-too-much-food/stories/played/otherwhere-vi/mechanics/skills/properties/otherwhere-vi-skill-stamina-cost.number-property.types.ts"

export type OtherwhereViSkill = WorldSkill & {
  character: OtherwhereViSkillCharacter
  level: OtherwhereViSkillLevel
  staminaCost?: OtherwhereViSkillStaminaCost
}
