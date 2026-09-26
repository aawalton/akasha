import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiGrace = {
  id: "01a0de51-2d5f-707f-a9f4-40a868d51c37",
  type: "page-type/lore",
  slug: "partners-ii-grace",
  title: "Grace",
  world: "world/personas",
  about: "character-other/partners-ii-grace",
  loreDisclosure: "lore-disclosure/game-master",
  facts: ["Grace keeps the Veilmere.", "Grace is the strongest of the first wave of sisters."],
} as const satisfies Lore
