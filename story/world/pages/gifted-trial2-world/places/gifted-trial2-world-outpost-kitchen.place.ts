import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrial2WorldOutpostKitchen = {
  id: "01a18dab-06cd-77c7-b0a8-dd47799ab036",
  type: "page-type/place",
  slug: "gifted-trial2-world-outpost-kitchen",
  title: "Outpost Kitchen",
  world: "world/gifted-trial2-world",
  within: "place/gifted-trial2-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial2-world-outpost-common-room",
      way: "Through the side door behind the bar.",
    },
    { to: "place/gifted-trial2-world-outpost-yard", way: "Out the back door to the yard." },
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
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies Place
