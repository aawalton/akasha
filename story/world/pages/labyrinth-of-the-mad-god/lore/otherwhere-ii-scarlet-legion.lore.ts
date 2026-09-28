import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiScarletLegion = {
  id: "01a0e9c5-5f89-7ef1-8c9a-b746dedc78f4",
  type: "page-type/lore",
  slug: "otherwhere-ii-scarlet-legion",
  title: "The Scarlet Legion",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Scarlet Legion is a crimson army serving Taltos's pantheon.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
