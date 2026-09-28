import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiFritz = {
  id: "01a0e9cc-700a-7853-a1ce-bd8044c63146",
  type: "page-type/lore",
  slug: "otherwhere-ii-fritz",
  title: "Fritz, King of Kastilla",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Fritz is the last king of Kastilla, a farmer raised to the throne.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is the greatest warrior-mage in the history of the Kastillan people.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He has rich brown fur, wise yellow eyes and a wedge-shaped face.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
