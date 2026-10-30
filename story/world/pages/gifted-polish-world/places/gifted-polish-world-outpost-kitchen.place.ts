import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedPolishWorldOutpostKitchen = {
  id: "01a18e17-127d-7a77-b049-8e5ee6a647e4",
  type: "page-type/place",
  slug: "gifted-polish-world-outpost-kitchen",
  title: "Outpost Kitchen",
  world: "world/gifted-polish-world",
  within: "place/gifted-polish-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-polish-world-outpost-common-room",
      way: "Through the side door behind the bar.",
    },
    { to: "place/gifted-polish-world-outpost-yard", way: "Out the back door to the yard." },
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
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies Place
