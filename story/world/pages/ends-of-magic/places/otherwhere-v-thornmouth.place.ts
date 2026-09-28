import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVThornmouth = {
  id: "01a0ea00-458c-79e5-9437-a92149792177",
  type: "page-type/place",
  slug: "otherwhere-v-thornmouth",
  title: "Thornmouth",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-greyscale-wood",
  exits: [
    {
      to: "place/otherwhere-v-greyscale-ridge",
      way: "South along the ridges through scalebark forest to Greyscale Ridge; two days on foot.",
      direction: "south",
    },
    {
      way: "Down into the cleft and the dungeon's dark, thorn-choked passages.",
      direction: "down",
    },
  ],
  facts: [
    {
      fact: "Thornmouth is a small dungeon in a cleft of grey rock, two days' walk north of Fern Hollow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Black thorn bushes grow straight out of the bare rock around the cleft's mouth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cold air breathes out of the cleft, smelling of wet stone and rotting sap.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Thornmouth spawns thornlings, which wander out and hunt through the wood around it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serrinford's rangers clear Thornmouth each spring and autumn to keep its spawn thin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This autumn's clearing failed a month ago: three rangers died and two came back wounded.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Since the failed clearing, thornlings have strayed south, some within a day of Fern Hollow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The rangers' old camp outside the cleft has a ring of sharpened stakes, now half broken.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
