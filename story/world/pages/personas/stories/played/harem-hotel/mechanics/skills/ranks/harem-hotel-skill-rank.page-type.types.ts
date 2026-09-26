import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"
import type { HaremHotelSkillRankWidth } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/ranks/properties/harem-hotel-skill-rank-width.number-property.types.ts"

export type HaremHotelSkillRank = WorldMechanic & {
  title: Title
  width?: HaremHotelSkillRankWidth
}
