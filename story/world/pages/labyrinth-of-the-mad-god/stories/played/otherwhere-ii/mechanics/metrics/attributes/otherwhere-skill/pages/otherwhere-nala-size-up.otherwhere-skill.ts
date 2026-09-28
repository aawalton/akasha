import type { OtherwhereSkill } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere-ii/mechanics/metrics/attributes/otherwhere-skill/otherwhere-skill.page-type.types.ts"

export const otherwhereNalaSizeUp = {
  id: "01a0e9a0-42e7-7236-bbc2-7335a632e0d4",
  type: "page-type/otherwhere-skill",
  slug: "otherwhere-nala-size-up",
  title: "Size up",
  description: "Reading how dangerous a creature is, and a prickle of warning when danger is near.",
  character: "character-player/otherwhere-nala",
  value: 0,
  minValue: 0,
  maxValue: 10,
  history: "jsonl",
} as const satisfies OtherwhereSkill
