import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxRandallPalace = {
  id: "01a0ea42-fcc1-7069-a926-499b325129de",
  type: "page-type/place",
  slug: "otherwhere-ix-randall-palace",
  title: "Randall's Palace",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-gilded-harbour-city",
  facts: [
    {
      fact: "Randall's palace is a grand silvery palace with gardens above the gilded harbour city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A high balcony of the palace overlooks the whole city and its harbour.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Randall teleports guests to the balcony and serves them conjured food.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Randall offered Markus Brown work as his debt collector on this balcony, over tomato soup.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
