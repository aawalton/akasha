import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const otherwhereViNala = {
  id: "01a0ea3e-c8ce-7a73-b19d-4ca4d1114a1e",
  type: "page-type/metric-character-mana",
  slug: "otherwhere-vi-nala",
  title: "MP",
  character: "character-player/otherwhere-vi-nala",
  value: 5,
  minValue: 0,
  maxValue: 5,
  history: "jsonl",
  displayOrder: 2,
  createdAt: "2026-09-28T22:59:38.318Z",
  updatedAt: "2026-09-30T11:06:17.000Z",
} as const satisfies MetricCharacterMana
