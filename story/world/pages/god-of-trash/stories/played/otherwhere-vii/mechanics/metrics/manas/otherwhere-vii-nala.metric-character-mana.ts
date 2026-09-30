import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const otherwhereViiNala = {
  id: "01a0ea37-18e3-7a93-8bbf-4e48aeab6ca9",
  type: "page-type/metric-character-mana",
  slug: "otherwhere-vii-nala",
  character: "character-player/otherwhere-vii-nala",
  value: 0,
  minValue: 0,
  maxValue: 0,
  history: "jsonl",
  displayOrder: 2,
  unrevealed: true,
} as const satisfies MetricCharacterMana
