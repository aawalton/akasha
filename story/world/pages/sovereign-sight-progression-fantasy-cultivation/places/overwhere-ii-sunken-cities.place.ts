import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiSunkenCities = {
  id: "01a0ed25-b180-7527-90e7-2ed8ede9e79e",
  type: "page-type/place",
  slug: "overwhere-ii-sunken-cities",
  title: "The Sunken City",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  facts: [
    {
      fact: "The Sunken City, or Sunken Cities, lies at the root of the Gnarl, west of the pass road.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sunken City exists because of the tidal-gem vein mined from the mountain's roots.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sunken City controls the low road under the Gnarl.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sunken City is meant to patrol the Gnarl passes but no longer does.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sunken City is said to be squalid, yet it sells finer goods than the north.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Poisons sell for gold in the Sunken City; merchants carry wagons of goods there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sunken City route runs too close to Shroud territory for the cautious.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pellus Lighthouse, an Ancestor Shrine, is in the Sunken City.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
