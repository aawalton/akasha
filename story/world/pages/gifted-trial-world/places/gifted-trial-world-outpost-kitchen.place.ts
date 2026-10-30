import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrialWorldOutpostKitchen = {
  id: "01a18d10-93f1-72b8-98c0-5d898dffc986",
  type: "page-type/place",
  slug: "gifted-trial-world-outpost-kitchen",
  title: "Outpost Kitchen",
  world: "world/gifted-trial-world",
  within: "place/gifted-trial-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial-world-outpost-common-room",
      way: "Through the side door behind the bar.",
    },
    { to: "place/gifted-trial-world-outpost-yard", way: "Out the back door to the yard." },
  ],
  facts: [
    {
      fact: "The kitchen has a big hearth, a long worktable, and hanging pots and herbs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A cold larder off the kitchen holds the winter stores.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Place
