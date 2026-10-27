import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedOutpostKitchen = {
  id: "01a17edb-c5da-709f-9185-0aaba16127f4",
  type: "page-type/place",
  slug: "gifted-outpost-kitchen",
  title: "Outpost Kitchen",
  world: "world/gifted",
  within: "place/gifted-horndale-outpost",
  depth: 0,
  exits: [
    { to: "place/gifted-outpost-common-room", way: "Through the side door behind the bar." },
    { to: "place/gifted-outpost-yard", way: "Out the back door to the yard." },
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
  createdAt: "2026-10-27T19:34:54.679Z",
  updatedAt: "2026-10-27T19:34:54.679Z",
} as const satisfies Place
