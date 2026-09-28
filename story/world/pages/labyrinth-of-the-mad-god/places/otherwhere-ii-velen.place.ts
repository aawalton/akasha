import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiVelen = {
  id: "01a0e9bc-75a2-7271-85e8-40bb760d97a3",
  type: "page-type/place",
  slug: "otherwhere-ii-velen",
  title: "Velen, the Craft World",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Velen is a craft world certified by the System and a metropolis of millions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its bright stone and wooden buildings take organic shapes among parks and trees.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Avian people live there with dozens of other species, and beasts share the streets as equals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Everyone on Velen is combat trained, and even children go armed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Crafters there forge, repair and modify arms, armor and gear.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Trade runs on barter, and the System caps a crafter's profit at a quarter of the price.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bringing your own materials makes a commission far cheaper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A visitor may stay at most three days, and longer jobs are delivered by the System.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
