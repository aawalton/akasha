import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { HaremHotelSkillCharacter } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/properties/harem-hotel-skill-character.relation-property.types.ts"
import type { HaremHotelSkillDemonstrations } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/properties/harem-hotel-skill-demonstrations.number-property.types.ts"
import type { HaremHotelSkillLevel } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/properties/harem-hotel-skill-level.number-property.types.ts"
import type { HaremHotelSkillSkill } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/properties/harem-hotel-skill-skill.relation-property.types.ts"
import type { RankOfHaremHotelSkill } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/properties/rank-of-harem-hotel-skill.relation-property.types.ts"

export type HaremHotelSkill = WorldSkill & {
  character: HaremHotelSkillCharacter
  skill: HaremHotelSkillSkill
  rank: RankOfHaremHotelSkill
  level: HaremHotelSkillLevel
  demonstrations: HaremHotelSkillDemonstrations
}
