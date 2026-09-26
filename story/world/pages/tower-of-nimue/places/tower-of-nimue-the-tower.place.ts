import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const towerOfNimueTheTower = {
  id: "01a0dec2-d48d-7745-ab27-232a6e6a3766",
  type: "page-type/place",
  slug: "tower-of-nimue-the-tower",
  title: "The Tower",
  world: "world/tower-of-nimue",
  loreDisclosure: "lore-disclosure/game-master",
} as const satisfies Place
