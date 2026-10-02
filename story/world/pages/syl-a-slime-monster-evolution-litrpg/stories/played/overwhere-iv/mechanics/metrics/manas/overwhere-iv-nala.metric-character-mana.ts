import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const overwhereIvNala = {
  id: "01a0ed22-eab7-7516-91bb-48ce0ce2b412",
  type: "page-type/metric-character-mana",
  slug: "overwhere-iv-nala",
  character: "character-player/overwhere-iv-nala",
  value: 1,
  minValue: 0,
  maxValue: 74,
  history: "jsonl",
  displayOrder: 2,
  revealedAs: "The warmth behind your ribs: a last ember, nearly gone.",
} as const satisfies MetricCharacterMana
