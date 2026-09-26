import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersAlanWatched = {
  id: "01a0de54-79c2-72ea-bea0-e67b0d0c9a7b",
  type: "page-type/lore",
  slug: "partners-alan-watched",
  title: "Who watches Alan",
  world: "world/personas",
  about: "character-player/partners-alan",
  loreDisclosure: "lore-disclosure/game-master",
  facts: ["Crane is watching Alan."],
} as const satisfies Lore
