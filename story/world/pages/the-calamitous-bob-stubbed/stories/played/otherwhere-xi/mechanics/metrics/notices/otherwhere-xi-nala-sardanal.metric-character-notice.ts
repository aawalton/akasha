import type { MetricCharacterNotice } from "akasha/story/world/mechanics/metrics/metric-character/attribute/notice/metric-character-notice.page-type.types.ts"

export const otherwhereXiNalaSardanal = {
  id: "01a0eb38-6661-774c-9896-a06ca4d91133",
  type: "page-type/metric-character-notice",
  slug: "otherwhere-xi-nala-sardanal",
  character: "character-player/otherwhere-xi-nala",
  value: 2,
  minValue: 0,
  maxValue: 100,
  history: "jsonl",
  unrevealed: true,
} as const satisfies MetricCharacterNotice
