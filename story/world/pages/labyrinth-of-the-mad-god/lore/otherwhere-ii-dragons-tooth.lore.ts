import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiDragonsTooth = {
  id: "01a0e9cc-7009-7ebe-9c4d-4372951d58cc",
  type: "page-type/lore",
  slug: "otherwhere-ii-dragons-tooth",
  title: "Dragon's Tooth",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Settlements whose cores fall lose nearly everything they have built.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:54:44.489Z",
  updatedAt: "2026-09-28T22:32:31.000Z",
} as const satisfies Lore
