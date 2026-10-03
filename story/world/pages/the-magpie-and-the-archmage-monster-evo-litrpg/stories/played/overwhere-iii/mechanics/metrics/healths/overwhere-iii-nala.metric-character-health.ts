import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereIiiNala = {
  id: "01a0ed28-1dfc-7b18-a3aa-6caf31cb84bb",
  type: "page-type/metric-character-health",
  slug: "overwhere-iii-nala",
  character: "character-player/overwhere-iii-nala",
  value: 22,
  minValue: 0,
  maxValue: 36,
  history: "jsonl",
  displayOrder: 1,
  revealedAs: "Battered; a failed knot and a second charge",
} as const satisfies MetricCharacterHealth
