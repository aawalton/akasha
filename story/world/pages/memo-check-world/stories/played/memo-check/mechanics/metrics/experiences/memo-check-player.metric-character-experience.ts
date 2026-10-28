import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const memoCheckPlayer = {
  id: "01a1832d-38c0-78ee-b724-ede2bb0188ca",
  type: "page-type/metric-character-experience",
  slug: "memo-check-player",
  title: "Experience Points",
  character: "character-player/memo-check-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies MetricCharacterExperience
