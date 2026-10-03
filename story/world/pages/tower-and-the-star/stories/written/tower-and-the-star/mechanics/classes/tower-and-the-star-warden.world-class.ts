import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const towerAndTheStarWarden = {
  id: "01a1033f-b3b4-7fce-adfd-e6a583878d74",
  type: "page-type/world-class",
  slug: "tower-and-the-star-warden",
  title: "Warden",
  world: "world/tower-and-the-star",
  description:
    "A healer and protector, with skills such as Mending Touch, Nature's Veil and Thorned Ground.",
} as const satisfies WorldClass
