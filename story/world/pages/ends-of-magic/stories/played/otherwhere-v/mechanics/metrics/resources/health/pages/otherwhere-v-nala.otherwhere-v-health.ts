import type { OtherwhereVHealth } from "akasha/story/world/pages/ends-of-magic/stories/played/otherwhere-v/mechanics/metrics/resources/health/otherwhere-v-health.page-type.types.ts"

export const otherwhereVNala = {
  id: "01a0e9ff-ce46-7195-bfb1-b29119ecfe3a",
  type: "page-type/otherwhere-v-health",
  slug: "otherwhere-v-nala",
  character: "character-player/otherwhere-v-nala",
  value: 5,
  minValue: 0,
  maxValue: 20,
  history: "jsonl",
} as const satisfies OtherwhereVHealth
