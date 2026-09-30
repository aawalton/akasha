import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const otherwhereIAlan = {
  id: "01a0e363-036f-7fc9-aebd-f2581522f6f5",
  type: "page-type/metric-character-mana",
  slug: "otherwhere-i-alan",
  character: "character-player/otherwhere-i-alan",
  value: 18,
  minValue: 0,
  maxValue: 18,
  history: "jsonl",
  displayOrder: 2,
} as const satisfies MetricCharacterMana
