import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersNova = {
  id: "01a0de54-1c11-75c4-8d80-d0bfa7a83102",
  type: "page-type/lore",
  slug: "partners-nova",
  title: "Nova",
  world: "world/personas",
  about: "character-other/partners-nova",
  loreDisclosure: "lore-disclosure/game-master",
  facts: ["Nova is a goblin burglar-scholar."],
} as const satisfies Lore
