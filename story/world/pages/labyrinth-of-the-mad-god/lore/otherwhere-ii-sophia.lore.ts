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
} as const satisfies Lore
