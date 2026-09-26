import type { HaremHotelSkill } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/skills/harem-hotel-skill.page-type.types.ts"

export const haremHotelAriaReadTheTable = {
  id: "01a0de54-1a0a-79b4-a0f3-d4bed8dd6837",
  type: "page-type/harem-hotel-skill",
  slug: "harem-hotel-aria-read-the-table",
  title: "Read the Table",
  character: "character-other/harem-hotel-aria",
  skill: "world-skill/harem-hotel-read-the-table",
  rank: "harem-hotel-skill-rank/harem-hotel-journeyman",
  level: 11,
  demonstrations: 0,
} as const satisfies HaremHotelSkill
