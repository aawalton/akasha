import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrial2WorldOutpostFamilyRooms = {
  id: "01a18dab-06cd-7afc-9f14-23a57bab544d",
  type: "page-type/place",
  slug: "gifted-trial2-world-outpost-family-rooms",
  title: "Hawthorn Family Rooms",
  world: "world/gifted-trial2-world",
  within: "place/gifted-trial2-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial2-world-outpost-guest-rooms",
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
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies Place
