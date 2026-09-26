import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiNatalie = {
  id: "01a0de51-2d5f-7982-b809-2e7e1a9afac1",
  type: "page-type/lore",
  slug: "partners-ii-natalie",
  title: "Natalie",
  world: "world/personas",
  about: "character-other/partners-ii-natalie",
  facts: [
    {
      fact: "Natalie is a traveling cook of quietly legendary rank.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Natalie followed the kitchen's song for a week.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
