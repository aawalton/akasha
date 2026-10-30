import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedPolishWorldOutpostFamilyRooms = {
  id: "01a18e17-127d-7300-8f25-b89c735b1be6",
  type: "page-type/place",
  slug: "gifted-polish-world-outpost-family-rooms",
  title: "Hawthorn Family Rooms",
  world: "world/gifted-polish-world",
  within: "place/gifted-polish-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-polish-world-outpost-guest-rooms",
      way: "Down the stairs.",
      direction: "down",
    },
  ],
  facts: [
    {
      fact: "The third floor holds the Factor's family bedrooms, away from the guests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Penelope's bedroom window looks west, and a north room is free.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A narrow ladder climbs to the roof peak, about four storeys up.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies Place
