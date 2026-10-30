import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrialWorldCultHideout = {
  id: "01a18d10-93f1-761b-854c-722e66107c19",
  type: "page-type/place",
  slug: "gifted-trial-world-cult-hideout",
  title: "Cult Hideout",
  world: "world/gifted-trial-world",
  within: "place/gifted-trial-world-horndale-mountains",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial-world-horndale-outpost",
      way: "Up the lower slopes and the pass road, two days' hard ride.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The hideout is an ancient, derelict stone outpost on the lower slopes of the Horndale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A demon cult used it as its nest, far from any road travellers watch.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its nursery held a stone bowl for a cradle, by a hall where the cult chanted and feasted.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Guild team that cleansed it burned it with every cultist and everything in it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Place
