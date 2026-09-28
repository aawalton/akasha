import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiKen = {
  id: "01a0e9cb-9157-79b1-8cc2-8fe150937d20",
  type: "page-type/lore",
  slug: "otherwhere-ii-ken",
  title: "Ken",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Ken is a skilled human swordsman who comes out of Liz's tutorial valley.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
