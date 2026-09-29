import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiGreywaterTarn = {
  id: "01a0ed23-174e-71b6-bc5b-e64fc00d7504",
  type: "page-type/place",
  slug: "overwhere-iii-greywater-tarn",
  title: "Greywater Tarn",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-wrenwood",
      way: "East along the Wren Brook half a day, back under the beeches.",
      direction: "east",
    },
  ],
  facts: [
    {
      fact: "Greywater Tarn is a cold hill lake in a bowl of reeds and rock, half a day west of the crossroads.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Spark toads, ice toads and water toads crowd its reed beds; their croaks carry for a mile.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its toads run Level 1 to Level 6, and each carries a glimmerstone in its throat sack.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merrowgate folk say a lady lives in the tarn and drowns men who go down to the water alone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The water is gray from the rock, clear an arm deep and black past that.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
