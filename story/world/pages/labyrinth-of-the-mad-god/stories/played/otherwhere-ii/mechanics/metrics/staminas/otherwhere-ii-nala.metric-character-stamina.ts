import type { MetricCharacterStamina } from "akasha/story/world/mechanics/metrics/metric-character/resource/stamina/metric-character-stamina.page-type.types.ts"

export const otherwhereIiNala = {
  id: "01a0e999-2dff-78d8-a604-4bd6d2d01b7f",
  type: "page-type/metric-character-stamina",
  slug: "otherwhere-ii-nala",
  character: "character-player/otherwhere-ii-nala",
  value: 11,
  minValue: 0,
  maxValue: 20,
  history: "jsonl",
  displayOrder: 3,
} as const satisfies MetricCharacterStamina
