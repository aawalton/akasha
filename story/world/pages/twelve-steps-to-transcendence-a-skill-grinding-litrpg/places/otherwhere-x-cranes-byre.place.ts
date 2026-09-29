import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXCranesByre = {
  id: "01a0eb2e-8a77-77e5-b1bc-9e21cee43c07",
  type: "page-type/place",
  slug: "otherwhere-x-cranes-byre",
  title: "The Cranes' Byre",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-harrow",
  facts: [
    {
      fact: "Behind the Cranes' house is a stone byre with one cow below and a hay loft above.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The byre loft is warm from the cow, reached by a ladder, and has one small shutter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The byre door has a bar on the outside, meant to keep the cow in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the house's back door a man can see the byre door and hear the ladder.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hob's pup sleeps in the byre straw, and barks at anything that moves in the night.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  exits: [
    {
      to: "place/otherwhere-x-harrow-green",
      way: "round the side of the Cranes' house to the green",
    },
  ],
} as const satisfies Place
