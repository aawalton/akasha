import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVBlightedContinent = {
  id: "01a0e9f7-ab12-7323-80f6-fb53ef38c72d",
  type: "page-type/place",
  slug: "otherwhere-v-blighted-continent",
  title: "The Blighted Continent",
  world: "world/ends-of-magic",
  facts: [
    {
      fact: "This continent is nearly all Blight, with the harbor city of Helmaris at its edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Helmaris lies over a month's sail from Kankus and about 25 days' sail from Ostren.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mountainous waves break along the coast off Helmaris.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Helmaris peninsula has walled settlements in its hollows, most of them mines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Smoke from the peninsula's smelters rises into the constant overcast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Blight lies down the peninsula from Helmaris, where the clouds are darkest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
