import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const undoCheckPlayer = {
  id: "01a18309-e114-7132-a40b-a47af82f9104",
  type: "page-type/metric-character-health",
  slug: "undo-check-player",
  character: "character-player/undo-check-player",
  value: 21,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies MetricCharacterHealth
