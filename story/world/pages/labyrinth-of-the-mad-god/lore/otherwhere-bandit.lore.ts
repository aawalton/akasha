import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereBandit = {
  id: "01a0e9cc-7009-72ef-a193-2039e0e5d19f",
  type: "page-type/lore",
  slug: "otherwhere-bandit",
  title: "Bandit",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Bandit is a raccoon-faced lemur of the Searing Isle tribe, friendly to humans who share food.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is clever and bold, and he returns every kindness in kind.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
