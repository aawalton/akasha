import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiKomos = {
  id: "01a0e9c0-87b3-7b1b-9adf-5f949c51434a",
  type: "page-type/lore",
  slug: "otherwhere-ii-komos",
  title: "Komos",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Komos are bulky, cold-blooded lizards several times a lemur's size.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They shift color like chameleons, brown on mud and ivory on sand.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They hunt in packs and pursue prey for hours to wear it down, but slow down on dunes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Their claws make trophies, and their meat makes good jerky.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
