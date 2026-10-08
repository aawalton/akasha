import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiSophia = {
  id: "01a0e9c9-1a4c-7ffd-8a7f-3fa7c28f3bd4",
  type: "page-type/lore",
  slug: "otherwhere-ii-sophia",
  title: "Sophia",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Sophia is a young human contestant of Earth with a sharp eye for hidden doors.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:51:05.932Z",
  updatedAt: "2026-09-28T22:37:21.000Z",
} as const satisfies Lore
