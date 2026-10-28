import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const timeProbePlayer = {
  id: "01a1802d-b13e-73cd-b877-1e3edfd84dc9",
  type: "page-type/metric-character-mana",
  slug: "time-probe-player",
  character: "character-player/time-probe-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies MetricCharacterMana
