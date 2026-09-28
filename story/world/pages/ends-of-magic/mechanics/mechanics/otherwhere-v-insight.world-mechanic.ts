import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVInsight = {
  id: "01a0e9f8-2dc5-7ae4-b5bd-0d68c62ade3e",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-insight",
  title: "Insight",
  world: "world/ends-of-magic",
  aliases: ["Insights", "Grand Insight"],
  description: "A true understanding of how something works, which Davrar counts and rewards.",
} as const satisfies WorldMechanic
