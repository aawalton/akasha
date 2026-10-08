import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiBagOfMolding = {
  id: "01a0e9d1-a3d8-7a40-b03a-963f0f644dd0",
  type: "page-type/lore",
  slug: "otherwhere-ii-bag-of-molding",
  title: "The Bag of Molding",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "A Bag of Molding is a Rare dimensional pack whose capacity is limited by weight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its owner can combine, split and shape items inside it by focused will.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Using its crafting draws on Mind and Creativity and costs some stamina and mana.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:00:25.432Z",
  updatedAt: "2026-09-28T22:30:51.000Z",
} as const satisfies Lore
