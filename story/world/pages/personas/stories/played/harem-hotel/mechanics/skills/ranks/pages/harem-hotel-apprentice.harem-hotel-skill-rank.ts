import type { HaremHotelSkillRank } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/ranks/harem-hotel-skill-rank.page-type.types.ts"

export const haremHotelApprentice = {
  id: "01a0de53-be40-7878-a9bc-3e95861ee132",
  type: "page-type/harem-hotel-skill-rank",
  slug: "harem-hotel-apprentice",
  title: "Apprentice",
  description: "Sees when the skill would help, and cannot yet produce it under pressure.",
  width: 10,
} as const satisfies HaremHotelSkillRank
