import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const breathOfTheWildLink = {
  id: "01a10332-3d65-7cab-bc26-c5d19b551b4e",
  type: "page-type/metric-character-health",
  slug: "breath-of-the-wild-link",
  title: "Hearts",
  character: "character-other/breath-of-the-wild-link",
  description: "Link's hearts, counted in quarter-hearts, four to a heart.",
  value: 16,
  minValue: 0,
  maxValue: 16,
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
