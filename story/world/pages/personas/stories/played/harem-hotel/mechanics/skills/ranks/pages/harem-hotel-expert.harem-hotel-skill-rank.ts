import type { HaremHotelSkillRank } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/ranks/harem-hotel-skill-rank.page-type.types.ts"

export const haremHotelExpert = {
  id: "01a0de53-be40-772d-84aa-246f17f58004",
  type: "page-type/harem-hotel-skill-rank",
  slug: "harem-hotel-expert",
  title: "Expert",
  description: "Does it unprompted, answering an opening they spotted with a move of their own.",
  width: 50,
} as const satisfies HaremHotelSkillRank
