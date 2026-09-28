import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIiTutorialPhases = {
  id: "01a0e9a6-b35e-74a8-90e9-5473be603bf9",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ii-tutorial-phases",
  title: "Tutorial Phases",
  world: "world/labyrinth-of-the-mad-god",
  description: "The stages a tutorial runs through, each changing its land and its dangers.",
} as const satisfies WorldMechanic
