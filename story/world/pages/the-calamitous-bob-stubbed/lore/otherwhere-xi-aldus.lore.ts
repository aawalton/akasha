import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAldus = {
  id: "01a0ea77-aa11-7c73-945b-28d7c8b272c7",
  type: "page-type/lore",
  slug: "otherwhere-xi-aldus",
  title: "Aldus",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-aldus",
  facts: [
    {
      fact: "Aldus is a Glastian royal heir who fought in the Glastian succession contest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Glastia's nobility and Helock's House Trez backed Aldus in the contest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "House Trez offered Sidjin a pardon if he would forfeit his duels to Aldus.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv fought on Aldus' team in the contest, held in Helock's arena one winter long ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No word of Aldus has come from the final war; he is thought to be in Glastia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
