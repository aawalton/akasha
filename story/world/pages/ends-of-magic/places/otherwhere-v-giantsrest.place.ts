import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVGiantsrest = {
  id: "01a0e9f2-cf72-79d5-87c5-1d1355b7b694",
  type: "page-type/place",
  slug: "otherwhere-v-giantsrest",
  title: "Giantsrest",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-giantsrest-continent",
  facts: [
    {
      fact: "Giantsrest is the capital of its dominion, a mage-city whose whole life rests on magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The city's roads radiate like wheel spokes from the Ascendant Academy at its hub.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Between the spoke roads lie villas, urban neighborhoods and tenements.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A glowing haze hangs over the Academy and lights the city by night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drozahn, an obelisk-spire, is the tallest tower in Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Satellite cities, orchards and crop fields surround Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Slipping out of Giantsrest unseen through its crop fields takes most of a night on foot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giantsrest wards everything and produces enchanted items for trade.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Academy grants its researchers towers outside the city, such as Taeol's to the west.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
