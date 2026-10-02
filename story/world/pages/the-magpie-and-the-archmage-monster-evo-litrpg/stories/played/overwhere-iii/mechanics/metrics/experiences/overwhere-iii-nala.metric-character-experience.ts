import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const overwhereIiiNala = {
  id: "01a0ed28-1dfb-71b2-9298-719823025ea9",
  type: "page-type/metric-character-experience",
  slug: "overwhere-iii-nala",
  character: "character-player/overwhere-iii-nala",
  value: 100,
  minValue: 0,
  maxValue: 200,
  history: "jsonl",
  displayOrder: 3,
  unrevealed: true,
} as const satisfies MetricCharacterExperience
