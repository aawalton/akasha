import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const overwhereIiiNala = {
  id: "01a0ed28-1dfc-791d-910c-54fc64e22148",
  type: "page-type/metric-character-mana",
  slug: "overwhere-iii-nala",
  character: "character-player/overwhere-iii-nala",
  value: 2,
  minValue: 0,
  maxValue: 10,
  history: "jsonl",
  displayOrder: 2,
  revealedAs: "Creeping back from near empty",
} as const satisfies MetricCharacterMana
