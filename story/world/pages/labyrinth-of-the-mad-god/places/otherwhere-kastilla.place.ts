import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereKastilla = {
  id: "01a0e9ba-0814-755c-a8e8-d89ac4f0b89a",
  type: "page-type/place",
  slug: "otherwhere-kastilla",
  title: "Kastilla, the Fallen Rat Kingdom",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Kastilla is the ruined capital of a dead world once ruled by a race of bipedal rat people.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only the sealed sewers beneath the city can still be reached.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
