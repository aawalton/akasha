import type { MetricCharacterLevel } from "akasha/story/world/mechanics/metrics/metric-character/attribute/level/metric-character-level.page-type.types.ts"

export const fairweatherTilly = {
  id: "01a10365-9cf0-7ade-aa6f-9883ba3fef03",
  type: "page-type/metric-character-level",
  slug: "fairweather-tilly",
  character: "character-other/fairweather-tilly",
  value: 3,
  minValue: 1,
  history: "jsonl",
  unrevealed: true,
} as const satisfies MetricCharacterLevel
