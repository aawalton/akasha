import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereVAntimagic = {
  id: "01a0e9f8-bed5-799c-8bb3-d1436bba9468",
  type: "page-type/world-mechanic",
  slug: "otherwhere-v-antimagic",
  title: "Antimagic",
  world: "world/ends-of-magic",
  aliases: ["antimage", "antimages"],
  description: "The power of denying, draining and breaking magic.",
} as const satisfies WorldMechanic
