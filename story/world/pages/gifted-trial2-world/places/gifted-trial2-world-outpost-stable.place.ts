import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrial2WorldOutpostStable = {
  id: "01a18dab-06cd-7ca2-a974-99e93a126e4e",
  type: "page-type/place",
  slug: "gifted-trial2-world-outpost-stable",
  title: "Outpost Stable",
  world: "world/gifted-trial2-world",
  within: "place/gifted-trial2-world-horndale-outpost",
  depth: 0,
  exits: [{ to: "place/gifted-trial2-world-outpost-yard", way: "Out into the yard." }],
  facts: [
    {
      fact: "The stable is a timber shed beside the outpost, with stalls and hay for guests' horses.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies Place
