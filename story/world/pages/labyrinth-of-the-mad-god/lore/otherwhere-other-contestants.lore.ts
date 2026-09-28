import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereOtherContestants = {
  id: "01a0e9cb-9157-7a11-a5ee-a86627f5be4a",
  type: "page-type/lore",
  slug: "otherwhere-other-contestants",
  title: "Other Contestants of Note",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Earth's contestants include soldiers, artists, crafters and elders restored to their prime.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
