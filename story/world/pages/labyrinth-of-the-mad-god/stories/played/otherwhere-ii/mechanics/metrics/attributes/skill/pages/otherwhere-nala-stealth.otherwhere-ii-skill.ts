import type { OtherwhereIiSkill } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere-ii/mechanics/metrics/attributes/skill/otherwhere-ii-skill.page-type.types.ts"

export const otherwhereNalaStealth = {
  id: "01a0e9a0-42e8-786b-853c-57641b07a03f",
  type: "page-type/otherwhere-ii-skill",
  slug: "otherwhere-nala-stealth",
  title: "Stealth",
  description: "Moving and keeping still unseen and unheard.",
  character: "character-player/otherwhere-nala",
  value: 0,
  minValue: 0,
  maxValue: 10,
  history: "jsonl",
} as const satisfies OtherwhereIiSkill
