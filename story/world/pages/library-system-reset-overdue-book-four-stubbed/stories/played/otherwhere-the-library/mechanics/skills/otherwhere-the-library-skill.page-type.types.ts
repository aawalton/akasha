import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OtherwhereSkillCharacter } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-the-library/mechanics/skills/properties/otherwhere-skill-character.relation-property.types.ts"
import type { OtherwhereSkillSkill } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-the-library/mechanics/skills/properties/otherwhere-skill-skill.relation-property.types.ts"

export type OtherwhereTheLibrarySkill = WorldSkill & {
  character: OtherwhereSkillCharacter
  skill: OtherwhereSkillSkill
}
