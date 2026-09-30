import type { MetricCharacterStamina } from "akasha/story/world/mechanics/metrics/metric-character/resource/stamina/metric-character-stamina.page-type.types.ts"

export const overwhereINala = {
  id: "01a0ed2c-b77b-7f74-b372-6600ef99a5f3",
  type: "page-type/metric-character-stamina",
  slug: "overwhere-i-nala",
  character: "character-player/overwhere-i-nala",
  value: 50,
  minValue: 0,
  maxValue: 54,
  history: "jsonl",
  displayOrder: 3,
} as const satisfies MetricCharacterStamina
