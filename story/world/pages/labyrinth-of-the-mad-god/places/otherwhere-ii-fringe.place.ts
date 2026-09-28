import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiFringe = {
  id: "01a0e9bf-c1f4-7e85-a36e-787676ef995e",
  type: "page-type/place",
  slug: "otherwhere-ii-fringe",
  title: "The Fringe",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The fringe is the widest and newest of the Labyrinth's six regions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "New sectors grow at its rim like roots spreading through soil.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its mana cannot long sustain beings beyond tier 3 or grade B.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Uncharted fringe nodes hide riches that draw elites and hunting patrons.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
