import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrial2WorldOutpostCommonRoom = {
  id: "01a18dab-06cd-7ff8-ad41-53f54d3428f8",
  type: "page-type/place",
  slug: "gifted-trial2-world-outpost-common-room",
  title: "Outpost Common Room",
  world: "world/gifted-trial2-world",
  within: "place/gifted-trial2-world-horndale-outpost",
  depth: 0,
  exits: [
    { to: "place/gifted-trial2-world-outpost-yard", way: "Out through the double front doors." },
    {
      to: "place/gifted-trial2-world-outpost-kitchen",
      way: "Through the side door behind the bar.",
    },
    {
      to: "place/gifted-trial2-world-outpost-office",
      way: "Through the side room off the entrance.",
    },
    {
      to: "place/gifted-trial2-world-outpost-guest-rooms",
      way: "Up the wooden stairs.",
      direction: "up",
    },
  ],
  facts: [
    {
      fact: "The front doors open into an entrance with a tall standing desk and a board of room keys.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Two fireplaces roar on the right-hand side, one at either end of the room.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tables and benches seat about thirty, and a fur rug lies before the fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stocked bar with cupboards behind it runs along the back wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The room smells of woodsmoke, pine and the pipe of the Factor.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies Place
