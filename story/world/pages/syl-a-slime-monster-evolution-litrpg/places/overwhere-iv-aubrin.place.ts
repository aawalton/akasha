import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvAubrin = {
  id: "01a0ed2d-8207-713b-86ba-70f0f99e525a",
  type: "page-type/place",
  slug: "overwhere-iv-aubrin",
  title: "Aubrin",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Aubrin is a walled city four days east of Millbrook along the east road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aubrin has a full branch of the Adventurers Guild, with affinity testing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aubrin has a street of alchemists, where Millbrook's slime jelly is sold.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A count holds Aubrin, and his garrison keeps the walls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aubrin sells what Millbrook cannot: fine goods, spell scrolls and trained teachers.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
