import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiAllianceCapital = {
  id: "01a0ea41-4b61-7bdc-b9f3-7a66ab85c54e",
  type: "page-type/place",
  slug: "otherwhere-vii-alliance-capital",
  title: "The Alliance capital",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "The Alliance capital lies weeks of travel east and north of Ashford, far past Bramwick.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is ruled from a vast inverted pyramid floating over the city's heart.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It has buildings of living trees, houses on stilts, floating halls and a gilded birdcage mall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Walled noble quarters under barriers crowd the pyramid's shadow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It has fashion houses, alchemists, device-makers, magic restaurants and a pleasure district.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Entry now needs a permit, and beggars and failed mages pick its rubbish.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The capital's ball season fills the autumn with galas; Briar Heart's Rose Gala is the greatest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
