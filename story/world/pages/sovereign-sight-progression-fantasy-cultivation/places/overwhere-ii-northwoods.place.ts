import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiNorthwoods = {
  id: "01a0ed24-5f62-7f09-9bf9-879f8407f8a4",
  type: "page-type/place",
  slug: "overwhere-ii-northwoods",
  title: "The Northwoods",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "The northwoods are the forest north of Vale, beyond the Gallant, running to the Drop.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Boar, wild hounds, wolves and feral beasts roam the northwoods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Northwoods folk live on scattered holdings and come to Vale for festivals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Stitcher Muir first loosed his Illwrought in the northwoods, north of the Gallant.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
