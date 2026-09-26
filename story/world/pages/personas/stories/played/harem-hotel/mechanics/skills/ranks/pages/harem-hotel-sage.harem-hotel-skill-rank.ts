import type { HaremHotelSkillRank } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/ranks/harem-hotel-skill-rank.page-type.types.ts"

export const haremHotelSage = {
  id: "01a0de53-be41-7928-a264-dac34fcbb601",
  type: "page-type/harem-hotel-skill-rank",
  slug: "harem-hotel-sage",
  title: "Sage",
  description: "Reframes what the skill is, turning a trick into a discipline of its own.",
} as const satisfies HaremHotelSkillRank
