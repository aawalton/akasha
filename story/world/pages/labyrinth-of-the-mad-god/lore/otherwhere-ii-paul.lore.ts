import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiPaul = {
  id: "01a0e9ca-c7c4-7a12-a2a1-cad28e78f539",
  type: "page-type/lore",
  slug: "otherwhere-ii-paul",
  title: "Paul",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Paul is a human contestant of Earth and an archer.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
