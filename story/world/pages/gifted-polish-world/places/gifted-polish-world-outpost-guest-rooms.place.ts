import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedPolishWorldOutpostGuestRooms = {
  id: "01a18e17-127d-799a-8d5d-643bdeb36ec5",
  type: "page-type/place",
  slug: "gifted-polish-world-outpost-guest-rooms",
  title: "Outpost Guest Rooms",
  world: "world/gifted-polish-world",
  within: "place/gifted-polish-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-polish-world-outpost-common-room",
      way: "Down the wooden stairs.",
      direction: "down",
    },
    {
      to: "place/gifted-polish-world-outpost-family-rooms",
      way: "Up the next flight.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The second floor is a corridor of guest rooms, each with a bed, a washstand and a window.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies Place
