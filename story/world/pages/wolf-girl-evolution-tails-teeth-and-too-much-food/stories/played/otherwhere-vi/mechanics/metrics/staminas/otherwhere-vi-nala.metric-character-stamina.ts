import type { MetricCharacterStamina } from "akasha/story/world/mechanics/metrics/metric-character/resource/stamina/metric-character-stamina.page-type.types.ts"

export const otherwhereViNala = {
  id: "01a0ea3e-c8ce-7d39-a7c2-5268dbab8266",
  type: "page-type/metric-character-stamina",
  slug: "otherwhere-vi-nala",
  title: "SP",
  character: "character-player/otherwhere-vi-nala",
  value: 28,
  minValue: 0,
  maxValue: 28,
  history: "jsonl",
  displayOrder: 3,
} as const satisfies MetricCharacterStamina
