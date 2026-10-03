import type { MetricCharacterLevel } from "akasha/story/world/mechanics/metrics/metric-character/attribute/level/metric-character-level.page-type.types.ts"

export const fairweatherTamsin = {
  id: "01a10365-9cf0-7e97-bc9d-979bbb528784",
  type: "page-type/metric-character-level",
  slug: "fairweather-tamsin",
  character: "character-other/fairweather-tamsin",
  value: 8,
  minValue: 1,
  unrevealed: true,
} as const satisfies MetricCharacterLevel
