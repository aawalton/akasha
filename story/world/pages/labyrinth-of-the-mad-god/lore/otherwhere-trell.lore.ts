import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereTrell = {
  id: "01a0e9cd-42e7-73fb-b8ca-f81d71207122",
  type: "page-type/lore",
  slug: "otherwhere-trell",
  title: "Trell the Foreman",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Trell is the ratman foreman who rules the Sewers of Kastilla as a blight-zombie.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
