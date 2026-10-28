import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const undoCheckPlayer = {
  id: "01a18309-e114-77d8-881f-7d8260b53811",
  type: "page-type/metric-character-experience",
  slug: "undo-check-player",
  title: "Experience Points",
  character: "character-player/undo-check-player",
  value: 140,
  minValue: 0,
  maxValue: 300,
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies MetricCharacterExperience
