import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrialWorldOutpostStable = {
  id: "01a18d10-93f1-7858-8aa2-95d35996d178",
  type: "page-type/place",
  slug: "gifted-trial-world-outpost-stable",
  title: "Outpost Stable",
  world: "world/gifted-trial-world",
  within: "place/gifted-trial-world-horndale-outpost",
  depth: 0,
  exits: [{ to: "place/gifted-trial-world-outpost-yard", way: "Out into the yard." }],
  facts: [
    {
      fact: "The stable is a timber shed beside the outpost, with stalls and hay for guests' horses.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Place
