import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const otherwhereIiNala = {
  id: "01a0e999-2dff-7a05-a845-ee20ebbfd902",
  type: "page-type/metric-character-mana",
  slug: "otherwhere-ii-nala",
  character: "character-player/otherwhere-ii-nala",
  value: 6,
  minValue: 0,
  maxValue: 6,
  history: "jsonl",
  displayOrder: 2,
} as const satisfies MetricCharacterMana
