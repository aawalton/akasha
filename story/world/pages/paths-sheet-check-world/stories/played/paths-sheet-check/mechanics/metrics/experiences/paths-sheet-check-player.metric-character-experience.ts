import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const pathsSheetCheckPlayer = {
  id: "01a182db-5bf2-7b2e-8459-0313026ab97c",
  type: "page-type/metric-character-experience",
  slug: "paths-sheet-check-player",
  title: "Experience Points",
  character: "character-player/paths-sheet-check-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies MetricCharacterExperience
