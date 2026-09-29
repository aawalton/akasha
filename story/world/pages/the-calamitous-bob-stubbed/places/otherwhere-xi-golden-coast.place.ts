import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiGoldenCoast = {
  id: "01a0ea8a-7b79-7633-b7f5-181e4c131c61",
  type: "page-type/place",
  slug: "otherwhere-xi-golden-coast",
  title: "The Golden Coast",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-vizim",
  facts: [
    {
      fact: "The Golden Coast is Vizim's fertile southern crescent along the Viziman Ocean.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Golden Coast runs from Sheem in the east, past the Central Principalities, to Sandsong.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ravinport, a white-walled port, was the Golden Coast's neutral trading city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Golden Coast fields are watered by water dancers, whose dances irrigate the land.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Golden Coast lowlands hold orchards, villages and beehives.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flash floods sweep Golden Coast riverbeds in the rain season; wooden bridges are rebuilt after.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inland of the Golden Coast lie the deep desert and the Salt Mountains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sheem conquered the Golden Coast this autumn and winter as Oleander's ally.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The whole Golden Coast was under Sheem and Oleander by this winter's solstice.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
