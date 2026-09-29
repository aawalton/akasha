import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiHollowHold = {
  id: "01a0ed26-a466-7f48-8e9a-4e6e114a7267",
  type: "page-type/place",
  slug: "overwhere-ii-hollow-hold",
  title: "The Hollow Hold",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "The Hollow Hold is a noble preparatory school for the Nine Spires, far from the north.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Hollow Hold is run by governesses and schools elite children and heirs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Hollow Hold teaches the Spires' core classes and the development of Talent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Hollow Hold teaches the common signs of Depth: the eyes, steady breathing, relaxed tension.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hollow Hold maxim: Be bold! Be daring! Master the Ordeal, do not let it master you.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hollow Hold students include heiresses such as Mae Mallova.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
