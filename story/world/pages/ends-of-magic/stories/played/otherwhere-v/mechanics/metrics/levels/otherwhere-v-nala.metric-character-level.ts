import type { MetricCharacterLevel } from "akasha/story/world/mechanics/metrics/metric-character/attribute/level/metric-character-level.page-type.types.ts"

export const otherwhereVNala = {
  id: "01a0e9ff-ce45-7f3b-8f36-8e20e46099fd",
  type: "page-type/metric-character-level",
  slug: "otherwhere-v-nala",
  character: "character-player/otherwhere-v-nala",
  value: 1,
  minValue: 1,
  history: "jsonl",
  unrevealed: true,
} as const satisfies MetricCharacterLevel
