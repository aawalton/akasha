import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLan = {
  id: "01a0ea8f-07e4-7a61-b9ce-afa95de07ff3",
  type: "page-type/lore",
  slug: "otherwhere-xi-lan",
  title: "Lan",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-lan",
  facts: [
    {
      fact: "Lan is assistant to the banker Tom Manitaradin, once of the Manipeleso Bank and Exchange.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lan followed Tom into Viv's service when he became her financial advisor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lan is thought to work in Harrak's finances still this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
