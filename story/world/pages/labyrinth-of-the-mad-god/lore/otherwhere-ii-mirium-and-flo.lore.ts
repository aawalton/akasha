import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiMiriumAndFlo = {
  id: "01a0e9ca-c7c4-78a4-b806-58a1245b964c",
  type: "page-type/lore",
  slug: "otherwhere-ii-mirium-and-flo",
  title: "Mirium and Flo",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Mirium is a human contestant of Earth and a water mage.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:52:55.876Z",
  updatedAt: "2026-09-28T22:34:49.000Z",
} as const satisfies Lore
