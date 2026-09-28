import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiBramwick = {
  id: "01a0ea26-a40f-751d-b5d0-3e6a5a75046b",
  type: "page-type/place",
  slug: "otherwhere-vii-bramwick",
  title: "Bramwick",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "Bramwick is a walled market town half a day's cart ride from Ashford, away from the mountain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Ashford road runs from Bramwick past the ditch to Ashford, and on toward the mountain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bramwick holds a market every few days, where the farm villages round about sell and buy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bramwick has a papermaker, a glue-boiler and a smith who buy what the rag-and-bone men bring.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
