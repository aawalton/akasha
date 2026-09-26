import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theDatingGameRockCanyon = {
  id: "01a0dec2-d48d-7f14-9ef6-310501b85b8d",
  type: "page-type/place",
  slug: "the-dating-game-rock-canyon",
  title: "Rock Canyon",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/game-master",
} as const satisfies Place
