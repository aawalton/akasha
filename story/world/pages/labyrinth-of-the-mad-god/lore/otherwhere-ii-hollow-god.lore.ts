import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiHollowGod = {
  id: "01a0e9c7-1b29-7ada-9e58-78a19622330b",
  type: "page-type/lore",
  slug: "otherwhere-ii-hollow-god",
  title: "The Hollow God",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Hollow God is a name whispered by dreadbeasts as their master.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
