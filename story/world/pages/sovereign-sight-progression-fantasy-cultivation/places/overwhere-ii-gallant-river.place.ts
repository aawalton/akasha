import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiGallantRiver = {
  id: "01a0ed24-057f-754d-86d5-798fc0e8e236",
  type: "page-type/place",
  slug: "overwhere-ii-gallant-river",
  title: "The Gallant River",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "The Gallant is a swift river flowing north through the town of Vale and past its south gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "North of Vale the Gallant runs through the northwoods; the Drop lies beyond it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Gallant's nearness gives Vale more Charterstones and larger fountains than Creston.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At least one Eidhrin slipped out of the Gallant's waters and haunted its banks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Gallant's fluid flow is a byword in the Vale for graceful movement.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
