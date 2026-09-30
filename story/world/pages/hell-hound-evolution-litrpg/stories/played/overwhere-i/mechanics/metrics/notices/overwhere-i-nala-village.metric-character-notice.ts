import type { MetricCharacterNotice } from "akasha/story/world/mechanics/metrics/metric-character/attribute/notice/metric-character-notice.page-type.types.ts"

export const overwhereINalaVillage = {
  id: "01a0ed2d-f66f-777c-9048-3a5c10a76d25",
  type: "page-type/metric-character-notice",
  slug: "overwhere-i-nala-village",
  character: "character-player/overwhere-i-nala",
  value: 1,
  minValue: 0,
  maxValue: 5,
  history: "jsonl",
  unrevealed: true,
} as const satisfies MetricCharacterNotice
