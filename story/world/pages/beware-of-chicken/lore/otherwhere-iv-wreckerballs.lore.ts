import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvWreckerballs = {
  id: "01a0ea11-a702-71fe-878d-8f2a879a4a6c",
  type: "page-type/lore",
  slug: "otherwhere-iv-wreckerballs",
  title: "Wreckerballs",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "Wreckerballs are armoured Spirit Beasts whose shells were once taken as feud trophies.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They live in the Wrecker Thicket, a bramble homeland with thorns as big as a man.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The largest Wreckerballs, the Old Shells, can grow as big as a house.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Wreckerballs have made peace with the Rumbling Earth Sect and choose its Sect Master.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
