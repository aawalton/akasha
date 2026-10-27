import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedOutpostGuestRooms = {
  id: "01a17edb-c5da-7c76-8e4c-fa5f95f4a10f",
  type: "page-type/place",
  slug: "gifted-outpost-guest-rooms",
  title: "Outpost Guest Rooms",
  world: "world/gifted",
  within: "place/gifted-horndale-outpost",
  depth: 0,
  exits: [
    { to: "place/gifted-outpost-common-room", way: "Down the wooden stairs.", direction: "down" },
    { to: "place/gifted-outpost-family-rooms", way: "Up the next flight.", direction: "up" },
  ],
  facts: [
    {
      fact: "The second floor is a corridor of guest rooms, each with a bed, a washstand and a window.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-27T19:34:54.679Z",
  updatedAt: "2026-10-27T19:34:54.679Z",
} as const satisfies Place
