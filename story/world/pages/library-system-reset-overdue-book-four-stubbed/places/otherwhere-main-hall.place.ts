import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereMainHall = {
  id: "01a0e354-6641-76e1-8c6d-4498f9a4c117",
  type: "page-type/place",
  slug: "otherwhere-main-hall",
  title: "The Main Hall",
  world: "world/library-system-reset-overdue-book-four-stubbed",
  facts: [
    {
      fact: "The main hall is at the top of the spiral staircase from the core chamber.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
