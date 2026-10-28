import type { MetricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.types.ts"

export const skillLockProbePlayer = {
  id: "01a17ff2-6f78-7e74-962a-9f3ab6820de2",
  type: "page-type/metric-character-mana",
  slug: "skill-lock-probe-player",
  character: "character-player/skill-lock-probe-player",
  value: 7,
  minValue: 0,
  maxValue: 12,
  displayOrder: 2,
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies MetricCharacterMana
