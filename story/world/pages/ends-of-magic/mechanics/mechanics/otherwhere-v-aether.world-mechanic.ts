import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVAether = {
  id: "01a0e9f2-2f10-736b-99be-e0174be67f89",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-aether",
  title: "The Aether",
  world: "world/ends-of-magic",
  aliases: ["aether", "aetheric plane"],
  description: "The unseen plane of magic.",
} as const satisfies WorldMechanic
