import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvCarrenGrove = {
  id: "01a0ed39-1e79-7e41-87c8-991eac4f5c7e",
  type: "page-type/place",
  slug: "overwhere-iv-carren-grove",
  title: "Carren Grove",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Carren Grove is an elven grove, a branch of the elves like the Feirelle and Nyrelis groves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its hometree is rooted to Caelthal, whose tree gates reach every loyal grove.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
