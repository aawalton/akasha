import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OtherwhereXiSkillCharacter } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/skills/properties/otherwhere-xi-skill-character.relation-property.types.ts"
import type { OtherwhereXiSkillLevel } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/skills/properties/otherwhere-xi-skill-level.number-property.types.ts"
import type { OtherwhereXiSkillRank } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/skills/properties/otherwhere-xi-skill-rank.text-property.types.ts"

export type OtherwhereXiSkill = WorldSkill & {
  character: OtherwhereXiSkillCharacter
  rank: OtherwhereXiSkillRank
  level: OtherwhereXiSkillLevel
}
