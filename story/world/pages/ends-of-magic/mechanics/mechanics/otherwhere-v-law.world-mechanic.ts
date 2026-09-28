import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVLaw = {
  id: "01a0ea05-739b-7bf5-97f6-28001f6334bd",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-law",
  title: "Law",
  world: "world/ends-of-magic",
  aliases: ["blood price", "the Truce of Ostren"],
  description: "The common laws of Davrar.",
} as const satisfies WorldMechanic
