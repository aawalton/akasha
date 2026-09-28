import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OtherwhereTheLibrarySkillCharacter } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/skills/properties/otherwhere-the-library-skill-character.relation-property.types.ts"
import type { OtherwhereTheLibrarySkillSkill } from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/skills/properties/otherwhere-the-library-skill-skill.relation-property.types.ts"

export type OtherwhereISkill = WorldSkill & {
  character: OtherwhereTheLibrarySkillCharacter
  skill: OtherwhereTheLibrarySkillSkill
}
