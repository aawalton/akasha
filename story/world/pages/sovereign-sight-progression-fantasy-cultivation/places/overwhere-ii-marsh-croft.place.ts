import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiMarshCroft = {
  id: "01a0ed20-ba0a-7fa9-a6ad-0a41ce6a571e",
  type: "page-type/place",
  slug: "overwhere-ii-marsh-croft",
  title: "Marsh Croft",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  within: "place/overwhere-ii-wendlemere",
  facts: [
    {
      fact: "Marsh Croft is a low turf-roofed cottage with a fold and a byre, a quarter mile below the barn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tobin Marsh keeps forty ewes there, most of them in lamb, and one old pony.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The cottage is one room with a box bed, a hearth, a table and a loft where Wren sleeps.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wren lies in the box bed by the fire now, so her father can watch her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The house smells of peat smoke, wet wool and Goody Brannoc's bitter poultice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cold iron nails are driven along the fold's top rail and over the cottage door.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
