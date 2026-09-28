import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVAlchemy = {
  id: "01a0e9f9-8feb-7761-bf49-5f15a59df502",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-alchemy",
  title: "Alchemy",
  world: "world/ends-of-magic",
  aliases: ["potions", "reagents"],
  description: "The making of potions and magical reagents from prepared ingredients.",
} as const satisfies WorldMechanic
