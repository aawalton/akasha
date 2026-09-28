import type { OtherwhereExperiencePoints } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere/mechanics/metrics/resources/experience-points/otherwhere-experience-points.page-type.types.ts"

export const otherwhereNala = {
  id: "01a0e99f-7726-7c5c-a05e-f81d572abcd3",
  type: "page-type/otherwhere-experience-points",
  slug: "otherwhere-nala",
  character: "character-player/otherwhere-nala",
  value: 0,
  minValue: 0,
  maxValue: 10,
  history: "jsonl",
} as const satisfies OtherwhereExperiencePoints
