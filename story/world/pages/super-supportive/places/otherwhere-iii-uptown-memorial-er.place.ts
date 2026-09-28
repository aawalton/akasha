import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiiUptownMemorialEr = {
  id: "01a0ea0d-8d5b-7ec1-b390-7b1d77a6bda8",
  type: "page-type/place",
  slug: "otherwhere-iii-uptown-memorial-er",
  title: "The Uptown Memorial ER",
  world: "world/super-supportive",
  facts: [
    {
      fact: "Uptown Memorial is a mid-sized hospital a block east of the Lawrence L stop, in Uptown.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the Lawrence platform it is a stair down, then one snowy block east to the ER doors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ER waiting room is warm and bright, with rows of chairs, a muted TV and a triage window.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  within: "place/otherwhere-iii-chicago",
} as const satisfies Place
