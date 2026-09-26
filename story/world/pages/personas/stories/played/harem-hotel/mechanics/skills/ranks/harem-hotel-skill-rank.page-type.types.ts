import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"
import type { HaremHotelSkillRankWidth } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/ranks/properties/harem-hotel-skill-rank-width.number-property.types.ts"

export type HaremHotelSkillRank = WorldRank & {
  width?: HaremHotelSkillRankWidth
}
