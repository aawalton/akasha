import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereDrezen = {
  id: "01a0e9ba-0813-7509-81c2-c3e18a3b12b3",
  type: "page-type/place",
  slug: "otherwhere-drezen",
  title: "Planet Drezen",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Drezen is a world with a small sun, and arrivals drift down from orbit in force bubbles.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A black spire of the Tower of Rizzen rises from Drezen and is visible from orbit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Blackmist Bog spreads around the tower's base.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
