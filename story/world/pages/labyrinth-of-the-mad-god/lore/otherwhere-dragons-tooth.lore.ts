import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereDragonsTooth = {
  id: "01a0e9cc-7009-7ebe-9c4d-4372951d58cc",
  type: "page-type/lore",
  slug: "otherwhere-dragons-tooth",
  title: "Dragon's Tooth",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Settlements whose cores fall lose nearly everything they have built.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
