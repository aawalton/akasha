import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereVRodOfAnnihilation = {
  id: "01a0ea03-e06f-7efa-8de6-de5965f44cd6",
  type: "page-type/world-item",
  slug: "otherwhere-v-rod-of-annihilation",
  title: "Rod of Annihilation",
  world: "world/ends-of-magic",
  aliases: ["rods of annihilation"],
  description: "A dreaded magical doomsday rod.",
} as const satisfies WorldItem
