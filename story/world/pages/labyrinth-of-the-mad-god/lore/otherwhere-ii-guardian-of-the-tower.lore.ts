import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiGuardianOfTheTower = {
  id: "01a0e9ce-df76-7de1-80d9-86b38e3073b0",
  type: "page-type/lore",
  slug: "otherwhere-ii-guardian-of-the-tower",
  title: "The Guardian of Darkstone Tower",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Clockwork constructs from the Guardian's portals melt and sink into the stone when destroyed.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
