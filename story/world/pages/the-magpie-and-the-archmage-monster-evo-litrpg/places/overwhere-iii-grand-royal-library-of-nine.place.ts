import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiGrandRoyalLibraryOfNine = {
  id: "01a0ed31-c668-78c8-af0e-d3799d90996f",
  type: "page-type/place",
  slug: "overwhere-iii-grand-royal-library-of-nine",
  title: "The Grand Royal Library of Nine",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  facts: [
    {
      fact: "The Grand Royal Library of Nine is the largest library in the Velithra Dominion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies in the Dominion, weeks of travel south of the northern hills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its royal name survives from the days of the monarchy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It displays its rarest books as treasures, under wards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Guards watch the library; breaking a treasure's ward alerts every one of them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An ancient Navaterian sigilcraft book is displayed there among its treasures.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Navaterian sigilcraft is an archaic system few living mages can read.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
