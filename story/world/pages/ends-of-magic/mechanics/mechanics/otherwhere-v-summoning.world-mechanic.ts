import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVSummoning = {
  id: "01a0e9ff-7e04-7700-b7aa-ab19063f3b66",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-summoning",
  title: "Summoning",
  world: "world/ends-of-magic",
  aliases: ["summoning magic", "summoning apparatus"],
  description: "Magic that calls a being from beyond Davrar.",
} as const satisfies WorldMechanic
