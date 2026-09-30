import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const otherwhereIiNala = {
  id: "01a0e99f-7726-7c5c-a05e-f81d572abcd3",
  type: "page-type/metric-character-experience",
  slug: "otherwhere-ii-nala",
  title: "Experience Points",
  character: "character-player/otherwhere-ii-nala",
  value: 0,
  minValue: 0,
  maxValue: 10,
  history: "jsonl",
  displayOrder: 4,
} as const satisfies MetricCharacterExperience
