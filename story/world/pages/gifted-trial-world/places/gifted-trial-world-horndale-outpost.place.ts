import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrialWorldHorndaleOutpost = {
  id: "01a18d10-93f1-7ba3-bddb-bc3a55f06783",
  type: "page-type/place",
  slug: "gifted-trial-world-horndale-outpost",
  title: "Horndale Outpost",
  world: "world/gifted-trial-world",
  within: "place/gifted-trial-world-horndale-mountains",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial-world-cult-hideout",
      way: "Down the pass road and the lower slopes, two days' hard ride.",
      direction: "down",
    },
  ],
  facts: [
    {
      fact: "The outpost is the Adventurer's Society's waystation and inn on the northern Horndale pass.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a big timber building of three storeys under a steep roof, with glass windows.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It sleeps about twenty guests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Goblins burned the old outpost four years ago and killed its Factor; this one was built after.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A dozen or so families live in houses scattered around the outpost.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In winter snow drifts against its walls and the pass closes behind it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Place
