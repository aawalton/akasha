import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiLabyrinthHeart = {
  id: "01a0e9bf-c1f5-7295-bc9b-99944cb1530d",
  type: "page-type/place",
  slug: "otherwhere-ii-labyrinth-heart",
  title: "The Heart of the Labyrinth",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The heart of the Labyrinth is surrounded by Taltos's own domain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No one who enters those central strata returns to tell of them.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T20:40:53.493Z",
  updatedAt: "2026-09-28T22:28:51.000Z",
} as const satisfies Place
