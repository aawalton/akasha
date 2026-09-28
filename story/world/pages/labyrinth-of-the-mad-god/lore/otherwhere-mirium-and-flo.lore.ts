import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereMiriumAndFlo = {
  id: "01a0e9ca-c7c4-78a4-b806-58a1245b964c",
  type: "page-type/lore",
  slug: "otherwhere-mirium-and-flo",
  title: "Mirium and Flo",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Mirium is a human contestant of Earth and a water mage.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
