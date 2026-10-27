import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedOutpostCommonRoom = {
  id: "01a17edb-c5d9-72fa-94e1-4d50038514b7",
  type: "page-type/place",
  slug: "gifted-outpost-common-room",
  title: "Outpost Common Room",
  world: "world/gifted",
  within: "place/gifted-horndale-outpost",
  depth: 0,
  exits: [
    { to: "place/gifted-outpost-yard", way: "Out through the double front doors." },
    { to: "place/gifted-outpost-kitchen", way: "Through the side door behind the bar." },
    { to: "place/gifted-outpost-office", way: "Through the side room off the entrance." },
    { to: "place/gifted-outpost-guest-rooms", way: "Up the wooden stairs.", direction: "up" },
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
  createdAt: "2026-10-27T19:34:54.679Z",
  updatedAt: "2026-10-27T19:34:54.679Z",
} as const satisfies Place
