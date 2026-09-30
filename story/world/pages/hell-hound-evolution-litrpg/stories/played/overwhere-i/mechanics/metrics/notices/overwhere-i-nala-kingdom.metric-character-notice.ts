import type { MetricCharacterNotice } from "akasha/story/world/mechanics/metrics/metric-character/attribute/notice/metric-character-notice.page-type.types.ts"

export const overwhereINalaKingdom = {
  id: "01a0ed2d-f66f-734a-988f-fd51ac3fd7a5",
  type: "page-type/metric-character-notice",
  slug: "overwhere-i-nala-kingdom",
  character: "character-player/overwhere-i-nala",
  value: 0,
  minValue: 0,
  maxValue: 5,
  history: "jsonl",
  unrevealed: true,
} as const satisfies MetricCharacterNotice
