import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVDeeds = {
  id: "01a0ea00-21ae-7b72-a02c-96f5487b30f2",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-deeds",
  title: "Deeds",
  world: "world/ends-of-magic",
  aliases: ["Deed", "great deed"],
  description: "A great feat.",
} as const satisfies WorldMechanic
