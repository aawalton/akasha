import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const skillLockProbePlayer = {
  id: "01a17ff8-9a7f-7c02-ab2d-f4c101fc68fb",
  type: "page-type/metric-character-mana",
  slug: "skill-lock-probe-player",
  character: "character-player/skill-lock-probe-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies MetricCharacterMana
