import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OtherwhereXSkillCharacter } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/skills/properties/otherwhere-x-skill-character.relation-property.types.ts"
import type { OtherwhereXSkillLevel } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/skills/properties/otherwhere-x-skill-level.number-property.types.ts"
import type { OtherwhereXSkillRarity } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/skills/properties/otherwhere-x-skill-rarity.relation-property.types.ts"
import type { OtherwhereXSkillSkill } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/skills/properties/otherwhere-x-skill-skill.relation-property.types.ts"

export type OtherwhereXSkill = WorldSkill & {
  character: OtherwhereXSkillCharacter
  skill: OtherwhereXSkillSkill
  level: OtherwhereXSkillLevel
  rarity: OtherwhereXSkillRarity
}
