import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvYellowRockPlateau = {
  id: "01a0ea0e-01b7-7e9b-8813-fadbf2ddccca",
  type: "page-type/place",
  slug: "otherwhere-iv-yellow-rock-plateau",
  title: "Yellow Rock Plateau",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-azure-hills",
  facts: [
    {
      fact: "Yellow Rock Plateau is a sheer stone wall between the Azure Hills and the rest of the Empire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Yellow Rock Plateau lies south of the Grass Sea and rises like a great wall near Grass Sea City.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The plateau is visible from 300 li away, rising uniform and near-vertical from the plain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The plateau's stone is banded yellow, red, white and pale blue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The only safe ascents are the ravine route by Grass Sea City or Stone Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The plateau top is a cold desert full of giant cactuses.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The plateau grows potatoes, corn, avocados (alligator pears) and tomatoes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The plateau trades cactus pears and big succulents; Azure Jade bulk-buys its produce.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jin once considered settling on the low-Qi Yellow Rock Plateau early in his travels.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
