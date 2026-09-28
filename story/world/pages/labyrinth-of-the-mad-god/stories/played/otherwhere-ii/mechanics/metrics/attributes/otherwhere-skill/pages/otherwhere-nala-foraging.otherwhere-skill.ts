import type { OtherwhereSkill } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere-ii/mechanics/metrics/attributes/otherwhere-skill/otherwhere-skill.page-type.types.ts"

export const otherwhereNalaForaging = {
  id: "01a0e9a0-42e7-75cc-8bd4-241e4a5ca60e",
  type: "page-type/otherwhere-skill",
  slug: "otherwhere-nala-foraging",
  title: "Foraging",
  description: "Finding food and water in the wild, and sensing what is safe to eat.",
  character: "character-player/otherwhere-nala",
  value: 1,
  minValue: 0,
  maxValue: 10,
  history: "jsonl",
} as const satisfies OtherwhereSkill
