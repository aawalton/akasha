import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrialWorldOutpostFamilyRooms = {
  id: "01a18d10-93f1-7530-824a-2488a9207acc",
  type: "page-type/place",
  slug: "gifted-trial-world-outpost-family-rooms",
  title: "Hawthorn Family Rooms",
  world: "world/gifted-trial-world",
  within: "place/gifted-trial-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial-world-outpost-guest-rooms",
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
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Place
