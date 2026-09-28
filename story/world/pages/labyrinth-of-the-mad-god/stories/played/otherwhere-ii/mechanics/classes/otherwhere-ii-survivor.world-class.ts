import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const otherwhereIiSurvivor = {
  id: "01a0e99e-1edc-7727-af5c-f78ea5c837a2",
  type: "page-type/world-class",
  slug: "otherwhere-ii-survivor",
  title: "Survivor (Basic)",
  world: "world/labyrinth-of-the-mad-god",
  description: "A basic class for one who lives through the wild on little.",
} as const satisfies WorldClass
