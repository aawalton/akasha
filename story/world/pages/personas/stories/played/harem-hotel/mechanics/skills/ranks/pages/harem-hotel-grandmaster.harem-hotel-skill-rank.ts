import type { HaremHotelSkillRank } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/ranks/harem-hotel-skill-rank.page-type.types.ts"

export const haremHotelGrandmaster = {
  id: "01a0de53-be40-7d00-8e77-4f83f1278893",
  type: "page-type/harem-hotel-skill-rank",
  slug: "harem-hotel-grandmaster",
  title: "Grandmaster",
  description: "Adds to the art with an original technique no master taught.",
  width: 250,
} as const satisfies HaremHotelSkillRank
