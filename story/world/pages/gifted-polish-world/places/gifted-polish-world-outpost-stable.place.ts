import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedPolishWorldOutpostStable = {
  id: "01a18e17-127d-741e-93c9-68b9f8324b1d",
  type: "page-type/place",
  slug: "gifted-polish-world-outpost-stable",
  title: "Outpost Stable",
  world: "world/gifted-polish-world",
  within: "place/gifted-polish-world-horndale-outpost",
  depth: 0,
  exits: [{ to: "place/gifted-polish-world-outpost-yard", way: "Out into the yard." }],
  facts: [
    {
      fact: "The stable is a timber shed beside the outpost, with stalls and hay for guests' horses.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies Place
