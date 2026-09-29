import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiDeepDesert = {
  id: "01a0ea8c-0795-7494-a8d1-d89e1f9056e3",
  type: "page-type/place",
  slug: "otherwhere-xi-deep-desert",
  title: "The Deep Desert of Vizim",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-vizim",
  facts: [
    {
      fact: "The deep desert fills inland Vizim, north of the Golden Coast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The deep desert is ravaged by elementals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The deep desert is cut by canyons and dry riverbeds that flash-flood in the rains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Globules of glass lie scattered on the deep desert's sands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brown elementals of the deep desert are invisible when still and reshape the land.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One mature brown elemental of the deep desert befriended Viv.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rathclaws and giant ants hunt in the deep desert.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sandsong's Life Road crosses the deep desert south to north, around the singing dunes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Travellers in the deep desert light no fires when hunted and hide carts under sand-colored tarps.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brown-mana scouts firm paths across the deep desert's sand.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
