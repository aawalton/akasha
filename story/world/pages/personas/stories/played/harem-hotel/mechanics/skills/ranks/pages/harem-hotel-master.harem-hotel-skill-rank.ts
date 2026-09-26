import type { HaremHotelSkillRank } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/ranks/harem-hotel-skill-rank.page-type.types.ts"

export const haremHotelMaster = {
  id: "01a0de53-be40-7be2-9574-7b6a66125272",
  type: "page-type/harem-hotel-skill-rank",
  slug: "harem-hotel-master",
  title: "Master",
  description: "Knows its principles, can teach it, and knows exactly where it stops working.",
  width: 100,
} as const satisfies HaremHotelSkillRank
