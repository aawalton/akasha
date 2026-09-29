import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiKvet = {
  id: "01a0ed26-0971-71e4-9868-91817d087b85",
  type: "page-type/place",
  slug: "overwhere-ii-kvet",
  title: "Kvet",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Kvet is the last stop on Liir before crossing the water to Kesca Isle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kvet lies past the Gnarl, through a hundred miles of wilderness.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kvet has a Lighthouse, an Ancestor Shrine keeping a library of instructional tomes.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
