import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiSouthroad = {
  id: "01a0ed24-bdd3-7968-affe-a67cd712022b",
  type: "page-type/place",
  slug: "overwhere-ii-southroad",
  title: "The Southroad",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "The Southroad is the straightest, fastest road south from Vale's south gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Chartermarked of the Vale take the Southroad toward their Ordeals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Manion's farm lies down the Southroad from Vale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Southroad runs past Haver Hill toward Creston and Runnel and on to the Gnarl.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
