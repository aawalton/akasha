import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiNatalie = {
  id: "01a0de51-2d5f-7982-b809-2e7e1a9afac1",
  type: "page-type/lore",
  slug: "partners-ii-natalie",
  title: "Natalie",
  world: "world/personas",
  about: "character-other/partners-ii-natalie",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Natalie is a traveling cook of quietly legendary rank.",
    "Natalie followed the kitchen's song for a week.",
  ],
} as const satisfies Lore
