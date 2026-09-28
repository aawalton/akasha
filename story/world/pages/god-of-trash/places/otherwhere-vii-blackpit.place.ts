import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViiBlackpit = {
  id: "01a0ea3f-8a33-7a2a-800e-7a82fc439620",
  type: "page-type/place",
  slug: "otherwhere-vii-blackpit",
  title: "The Blackpit",
  world: "world/god-of-trash",
  facts: [
    {
      fact: "The Blackpit is an old quarry two days' walk south of Ashford, past Sallow Mere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bramwick carted its rubbish to the quarry for a hundred years, until the smell drove it off.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At the quarry floor is a shaft that reeks and breathes icy air: an Impure Well.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nothing grows at the rim, birds avoid it, and folk say it is cursed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A family of poison badgers dens in the rubbish slopes of the Blackpit.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
