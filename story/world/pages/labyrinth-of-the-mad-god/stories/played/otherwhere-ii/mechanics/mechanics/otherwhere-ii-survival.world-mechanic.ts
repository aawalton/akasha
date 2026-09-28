import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIiSurvival = {
  id: "01a0e993-be67-78fd-b947-638337818566",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ii-survival",
  title: "Survival",
  world: "world/labyrinth-of-the-mad-god",
  description: "Staying alive in the wild: water, food, sleep, shade and shelter.",
} as const satisfies WorldMechanic
