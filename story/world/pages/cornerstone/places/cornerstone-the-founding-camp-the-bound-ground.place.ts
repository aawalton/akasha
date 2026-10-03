import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const cornerstoneTheFoundingCampTheBoundGround = {
  id: "01a0dec2-d48c-7f13-899a-f8aaef26d9eb",
  type: "page-type/place",
  slug: "cornerstone-the-founding-camp-the-bound-ground",
  title: "The Founding Camp (the bound ground)",
  world: "world/cornerstone",
  facts: [
    {
      fact: "The founding camp is a frontier settlement founded directly above the buried core.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The settlers arrived by wagon and made camp.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A scatter of restless feet became, over the first days, an organized founding.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ground bound to the core is the core's body, a finite place with three felt regions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The center is where the core lies deepest and most itself.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The center is the camp's heart, with the banked night-coal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The rim is a fixed line, always the same, where the core's ground frays off into mere dirt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Past the rim the core feels nothing, not even a falling foot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Settlers sometimes pause on the rim, toes on the last of the core, heels in the nothing beyond.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Settlers pausing on the rim face out.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "The high lip is one side where the ground tilts up before it ends.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The high lip is the rise the stone watch-stack is raised on.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rain percolates down to the core last of all.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
