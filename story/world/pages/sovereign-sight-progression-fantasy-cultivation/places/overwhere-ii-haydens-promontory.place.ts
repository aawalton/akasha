import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiHaydensPromontory = {
  id: "01a0ed24-5f62-730d-9518-9ca7f77d00a4",
  type: "page-type/place",
  slug: "overwhere-ii-haydens-promontory",
  title: "Hayden's Promontory",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Hayden's Promontory is a jutting point on the rim of the Drop, north of Vale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hidden handholds cut at Hayden's Promontory let a climber cross the Drop there.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
