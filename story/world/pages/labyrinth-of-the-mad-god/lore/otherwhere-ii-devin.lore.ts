import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiDevin = {
  id: "01a0e9c9-1a4b-7762-9a42-a637caf91649",
  type: "page-type/lore",
  slug: "otherwhere-ii-devin",
  title: "Devin",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Devin is a broad, steady human contestant of Earth who favors heavy weapons.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
