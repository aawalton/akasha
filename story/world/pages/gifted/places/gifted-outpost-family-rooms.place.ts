import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedOutpostFamilyRooms = {
  id: "01a17edb-c5da-78e9-b4f3-12fdcdc208b0",
  type: "page-type/place",
  slug: "gifted-outpost-family-rooms",
  title: "Hawthorn Family Rooms",
  world: "world/gifted",
  within: "place/gifted-horndale-outpost",
  depth: 0,
  exits: [{ to: "place/gifted-outpost-guest-rooms", way: "Down the stairs.", direction: "down" }],
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
  createdAt: "2026-10-27T19:34:54.679Z",
  updatedAt: "2026-10-27T19:34:54.679Z",
} as const satisfies Place
