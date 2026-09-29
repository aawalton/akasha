import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiWaterGuild = {
  id: "01a0ea89-f42d-7e28-ba40-dfe464b58679",
  type: "page-type/lore",
  slug: "otherwhere-xi-water-guild",
  title: "The Water Guild",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-water-guild",
  facts: [
    {
      fact: "The Water Guild is an ancient semi-public monopoly over water in Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Water Guild digs and keeps reservoirs for Harrakan villages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "By deal with the throne, Harrakan water sells at two iron bits a barrel.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Villages get priority on water under the Water Guild deal.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
