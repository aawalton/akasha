import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiAttunement = {
  id: "01a0ea7c-4d19-75f7-8e75-828c342225f6",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-attunement",
  title: "Attunement",
  world: "world/the-calamitous-bob-stubbed",
  description: "How far a body has taken on the magic of the world.",
} as const satisfies WorldMechanic
