import type { HaremHotelSkill } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/harem-hotel-skill.page-type.types.ts"

export const haremHotelAriaSetThePace = {
  id: "01a0de54-1a0a-7d5d-b013-06d1d65169d8",
  type: "page-type/harem-hotel-skill",
  slug: "harem-hotel-aria-set-the-pace",
  title: "Set the Pace",
  character: "character-other/harem-hotel-aria",
  skill: "world-skill/harem-hotel-set-the-pace",
  rank: "harem-hotel-skill-rank/harem-hotel-apprentice",
  level: 8,
  demonstrations: 0,
} as const satisfies HaremHotelSkill
