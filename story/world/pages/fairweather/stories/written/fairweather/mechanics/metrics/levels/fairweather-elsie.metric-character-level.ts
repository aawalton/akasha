import type { MetricCharacterLevel } from "akasha/story/world/mechanics/metrics/metric-character/attribute/level/metric-character-level.page-type.types.ts"

export const fairweatherElsie = {
  id: "01a102af-305c-76ff-970c-b90bf54d4fe8",
  type: "page-type/metric-character-level",
  slug: "fairweather-elsie",
  character: "character-player/fairweather-elsie",
  value: 1,
  minValue: 1,
  unrevealed: true,
} as const satisfies MetricCharacterLevel
