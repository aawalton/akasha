import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrial2WorldHorndaleOutpost = {
  id: "01a18dab-06cd-759d-bc0a-2d8d2f148696",
  type: "page-type/place",
  slug: "gifted-trial2-world-horndale-outpost",
  title: "Horndale Outpost",
  world: "world/gifted-trial2-world",
  within: "place/gifted-trial2-world-horndale-mountains",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial2-world-cult-hideout",
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
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies Place
