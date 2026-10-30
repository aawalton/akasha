import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrialWorldOutpostGuestRooms = {
  id: "01a18d10-93f1-7139-987f-82bead038702",
  type: "page-type/place",
  slug: "gifted-trial-world-outpost-guest-rooms",
  title: "Outpost Guest Rooms",
  world: "world/gifted-trial-world",
  within: "place/gifted-trial-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial-world-outpost-common-room",
      way: "Down the wooden stairs.",
      direction: "down",
    },
    {
      to: "place/gifted-trial-world-outpost-family-rooms",
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
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Place
