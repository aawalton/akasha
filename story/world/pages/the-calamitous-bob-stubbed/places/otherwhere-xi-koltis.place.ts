import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiKoltis = {
  id: "01a0ea86-d671-72d9-8ea0-d291641e1e15",
  type: "page-type/place",
  slug: "otherwhere-xi-koltis",
  title: "Koltis",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-enoria",
  facts: [
    {
      fact: "Koltis is an old fortified Enorian border town on a hillock, with walls, a castle and a market.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Koltis lies between northern and southern Enoria, south of Green Edge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Koltis is about ten days' travel from Kazar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Koltis is crowded inside its walls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Count Serril rules Koltis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Koltis was long a smuggling town, home to smuggling cartels.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Koltis is poorer now than in its smuggling heyday.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Koltisian marches around Koltis are called the worst region in Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
