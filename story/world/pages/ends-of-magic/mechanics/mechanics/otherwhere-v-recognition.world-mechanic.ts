import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVRecognition = {
  id: "01a0e9f2-0288-779d-b904-1f8ce57346d9",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-recognition",
  title: "Arrival and Recognition",
  world: "world/ends-of-magic",
  aliases: ["Welcome to Davrar", "Davrar has recognized you"],
  description: "The boxes Davrar shows a newcomer on arrival and when it recognizes them.",
} as const satisfies WorldMechanic
