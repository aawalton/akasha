import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersNatalie = {
  id: "01a0de54-1c11-7ba9-b1cd-44348f8b735c",
  type: "page-type/lore",
  slug: "partners-natalie",
  title: "Natalie",
  world: "world/personas",
  about: "character-other/partners-natalie",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Natalie is a traveling cook of quietly legendary rank.",
    "Natalie followed the kitchen's song for a week.",
  ],
} as const satisfies Lore
