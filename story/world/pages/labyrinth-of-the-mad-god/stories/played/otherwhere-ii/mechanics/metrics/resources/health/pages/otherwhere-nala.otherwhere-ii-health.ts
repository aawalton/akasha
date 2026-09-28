import type { OtherwhereIiHealth } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere-ii/mechanics/metrics/resources/health/otherwhere-ii-health.page-type.types.ts"

export const otherwhereNala = {
  id: "01a0e999-2dfe-72f5-95b0-c09aed082b1f",
  type: "page-type/otherwhere-ii-health",
  slug: "otherwhere-nala",
  character: "character-player/otherwhere-nala",
  value: 0,
  minValue: 0,
  maxValue: 18,
  history: "jsonl",
} as const satisfies OtherwhereIiHealth
