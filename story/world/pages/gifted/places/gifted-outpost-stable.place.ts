import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedOutpostStable = {
  id: "01a17edb-c5da-72c7-b670-e243ac551c1b",
  type: "page-type/place",
  slug: "gifted-outpost-stable",
  title: "Outpost Stable",
  world: "world/gifted",
  within: "place/gifted-horndale-outpost",
  depth: 0,
  exits: [{ to: "place/gifted-outpost-yard", way: "Out into the yard." }],
  facts: [
    {
      fact: "The stable is a timber shed beside the outpost, with stalls and hay for guests' horses.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-27T19:34:54.679Z",
  updatedAt: "2026-10-27T19:34:54.679Z",
} as const satisfies Place
