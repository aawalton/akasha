import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxTetricite = {
  id: "01a0ea41-7fd6-7c35-a657-f1df28c8d777",
  type: "page-type/lore",
  slug: "otherwhere-ix-tetricite",
  title: "Tetricite",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-item/otherwhere-ix-tetricite",
  facts: [
    {
      fact: "Tetricite is a metal of the fourth world.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tetricite glints, weighs little, and is incredibly durable.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tetricite conducts electricity well.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A small slab of tetricite costs one Faith point in a champion's Faith store.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Markus Brown carries a small tetricite slab in his inventory.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
