import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrial2WorldOutpostGuestRooms = {
  id: "01a18dab-06cd-77ff-9c90-82602a783cf5",
  type: "page-type/place",
  slug: "gifted-trial2-world-outpost-guest-rooms",
  title: "Outpost Guest Rooms",
  world: "world/gifted-trial2-world",
  within: "place/gifted-trial2-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial2-world-outpost-common-room",
      way: "Down the wooden stairs.",
      direction: "down",
    },
    {
      to: "place/gifted-trial2-world-outpost-family-rooms",
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
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies Place
