import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiXuthu = {
  id: "01a0e9cf-bd37-7280-9cb8-55077f78438e",
  type: "page-type/lore",
  slug: "otherwhere-ii-xuthu",
  title: "Xuthu the Storm Lord",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Xuthu the Storm Lord is the golden scorpion monarch of the Emerald Expanse.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lairs in a mountaintop castle and sleeps on mattresses where a throne once was.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:58:20.855Z",
  updatedAt: "2026-09-28T22:38:17.000Z",
} as const satisfies Lore
