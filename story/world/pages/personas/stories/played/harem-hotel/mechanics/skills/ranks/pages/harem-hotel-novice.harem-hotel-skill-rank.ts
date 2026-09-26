import type { HaremHotelSkillRank } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/ranks/harem-hotel-skill-rank.page-type.types.ts"

export const haremHotelNovice = {
  id: "01a0de53-be41-72a4-bafd-213f9af269e0",
  type: "page-type/harem-hotel-skill-rank",
  slug: "harem-hotel-novice",
  title: "Novice",
  description: "Has found the skill and not yet entered it.",
  width: 5,
} as const satisfies HaremHotelSkillRank
