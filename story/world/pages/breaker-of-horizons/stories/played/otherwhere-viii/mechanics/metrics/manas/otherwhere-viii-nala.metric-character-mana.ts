import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const otherwhereViiiNala = {
  id: "01a0ea43-5750-7ac5-8684-06eae63a6399",
  type: "page-type/metric-character-mana",
  slug: "otherwhere-viii-nala",
  title: "Arcana",
  character: "character-player/otherwhere-viii-nala",
  value: 6,
  minValue: -20,
  maxValue: 6,
  history: "jsonl",
  displayOrder: 2,
  unrevealed: true,
} as const satisfies MetricCharacterMana
