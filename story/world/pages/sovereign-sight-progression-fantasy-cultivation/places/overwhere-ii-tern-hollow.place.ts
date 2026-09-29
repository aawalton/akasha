import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiTernHollow = {
  id: "01a0ed0f-4bda-7db7-95d2-2dd54b0950d8",
  type: "page-type/place",
  slug: "overwhere-ii-tern-hollow",
  title: "Tern Hollow",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "Tern Hollow is a lone stone barn in a sheltered fold of hills, with a sagging hay loft.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "Old snow lies in the barn's shadow, and meltwater runs in the ruts of the lane outside.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "A lane runs down from the barn to a river valley of small farms and bare fields.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "White mountains rise along the far side of the valley, their peaks hidden in cloud.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "The barn belongs to a farm whose family is away at market for the week.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tern Hollow lies in a quiet valley far from where the canon's people are.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
