import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiRavinport = {
  id: "01a0ea8c-0796-7284-998e-b98f0055472b",
  type: "page-type/place",
  slug: "otherwhere-xi-ravinport",
  title: "Ravinport",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-golden-coast",
  facts: [
    {
      fact: "Ravinport is a small, white-walled port city of Vizim's Golden Coast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ravinport was a neutral city; its flag is blue with two yellow dots.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ravinport's fields are irrigated by water dancers; its lands hold orchards, villages and beehives.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flash floods rage through Ravinport's riverbeds; its wooden bridges are rebuilt after each.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From Ravinport it is five days to the top of the Salt Mountains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brown elementals, invisible when still, dwell in the desert inland of Ravinport.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sheem conquered Ravinport this autumn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bes of the Saritalagi, once Ravinport's envoy, is now Harrak's Grand Vizier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrak means to free Ravinport from Sheem.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
