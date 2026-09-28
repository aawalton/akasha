import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OtherwhereVRank } from "akasha/story/world/pages/ends-of-magic/stories/played/otherwhere-v/mechanics/talents/properties/otherwhere-v-rank.number-property.types.ts"
import type { OtherwhereVUtilitySkillCharacter } from "akasha/story/world/pages/ends-of-magic/stories/played/otherwhere-v/mechanics/utility-skills/properties/otherwhere-v-utility-skill-character.relation-property.types.ts"

export type OtherwhereVUtilitySkill = WorldSkill & {
  character: OtherwhereVUtilitySkillCharacter
  rank: OtherwhereVRank
}
