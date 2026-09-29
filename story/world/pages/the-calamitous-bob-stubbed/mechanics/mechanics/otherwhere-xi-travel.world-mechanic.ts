import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiTravel = {
  id: "01a0ea85-ad41-71f5-ad1a-3840ece2ae72",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-travel",
  title: "Travel",
  world: "world/the-calamitous-bob-stubbed",
  description: "The roads, inns, ships, gates and trains people journey by.",
} as const satisfies WorldMechanic
