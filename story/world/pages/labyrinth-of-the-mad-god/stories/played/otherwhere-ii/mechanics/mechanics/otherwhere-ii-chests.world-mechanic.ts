import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIiChests = {
  id: "01a0e9a6-b35d-780f-980a-6a582bfe20c0",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ii-chests",
  title: "Chests",
  world: "world/labyrinth-of-the-mad-god",
  description:
    "A reward box from the System, graded by its color, holding items and knowledge points.",
} as const satisfies WorldMechanic
