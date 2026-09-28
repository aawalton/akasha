import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiJim = {
  id: "01a0e9cb-9157-7e2b-9e33-b51b19b16dca",
  type: "page-type/lore",
  slug: "otherwhere-ii-jim",
  title: "Jim",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Jim leads a ruthless faction born in Liz's tutorial valley.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
