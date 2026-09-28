import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXuthu = {
  id: "01a0e9cf-bd37-7280-9cb8-55077f78438e",
  type: "page-type/lore",
  slug: "otherwhere-xuthu",
  title: "Xuthu the Storm Lord",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Xuthu the Storm Lord is the golden scorpion monarch of the Emerald Expanse.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lairs in a mountaintop castle and sleeps on mattresses where a throne once stood.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
