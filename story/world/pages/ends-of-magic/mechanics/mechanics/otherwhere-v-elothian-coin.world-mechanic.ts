import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVElothianCoin = {
  id: "01a0ea02-883e-7d09-8393-22bedcb4b5f8",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-elothian-coin",
  title: "Elothian Coin",
  world: "world/ends-of-magic",
  aliases: ["tesk", "lir", "oruna"],
  description: "The coins used on Elothia's settled rim.",
} as const satisfies WorldMechanic
