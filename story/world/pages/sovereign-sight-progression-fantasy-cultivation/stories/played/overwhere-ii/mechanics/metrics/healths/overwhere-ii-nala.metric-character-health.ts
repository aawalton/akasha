import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereIiNala = {
  id: "01a0ed2c-b09c-7ba4-a8b6-29708efdf78b",
  type: "page-type/metric-character-health",
  slug: "overwhere-ii-nala",
  title: "Vigour",
  character: "character-player/overwhere-ii-nala",
  value: 20,
  minValue: 0,
  maxValue: 35,
  history: "jsonl",
  displayOrder: 1,
  revealedAs: "Drunk her fill, head pounding eased; a frame like oak, iron",
  createdAt: "2026-09-29T12:38:44.124Z",
  updatedAt: "2026-10-03T13:25:52.000Z",
} as const satisfies MetricCharacterHealth
