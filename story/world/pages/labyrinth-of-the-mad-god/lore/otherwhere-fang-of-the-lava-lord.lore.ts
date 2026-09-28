import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereFangOfTheLavaLord = {
  id: "01a0e9d2-c08d-73b5-abf1-a3fdb3b126fa",
  type: "page-type/lore",
  slug: "otherwhere-fang-of-the-lava-lord",
  title: "Fang of the Lava Lord",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Fang of the Lava Lord is a weapon artifact that grows as its owner does.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
