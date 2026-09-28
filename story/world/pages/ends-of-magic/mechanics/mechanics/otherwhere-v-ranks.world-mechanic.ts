import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVRanks = {
  id: "01a0e9f5-a5d7-7328-a028-7300ae370972",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-ranks",
  title: "Ranks",
  world: "world/ends-of-magic",
  aliases: ["rank"],
  description: "The number after a Talent or utility skill.",
} as const satisfies WorldMechanic
