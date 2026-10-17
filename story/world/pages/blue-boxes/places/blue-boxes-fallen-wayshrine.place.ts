import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const blueBoxesFallenWayshrine = {
  id: "01a14ae6-f162-79b5-86b5-e7d2000477d4",
  type: "page-type/place",
  slug: "blue-boxes-fallen-wayshrine",
  title: "The Fallen Wayshrine",
  world: "world/blue-boxes",
  facts: [
    {
      fact: "The wayshrine is a ring of tumbled pale stone on a bare hilltop, roofless, its floor gone to clover.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At its center is a waist-high stone plinth, cut with a rainbow arc worn almost smooth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a shrine to Iris, untended a lifetime; nobody below remembers whose it was.",
      knowers: ["lore-disclosure/game-master", "character-other/blue-boxes-iris"],
    },
    {
      fact: "Untended, it cannot hold Iris; cleared, lit and given an offering, it could hold her a heartbeat.",
      knowers: ["lore-disclosure/game-master", "character-other/blue-boxes-iris"],
    },
    {
      fact: "A sheep track runs down through gorse to the market town of Tallowmere, an hour's walk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nala comes to at the plinth's foot on a mid-autumn afternoon, in what she wore to bed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System names the spot 'Wayshrine (fallen), Tallowmere Hills'.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wind there carries sheep, wet grass and woodsmoke from the town below.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clearing it takes an afternoon's work; an offering may be bread, a flower or a candle.",
      knowers: ["lore-disclosure/game-master", "character-other/blue-boxes-iris"],
    },
  ],
  exits: [
    {
      to: "place/blue-boxes-tallowmere",
      way: "down the sheep track through the gorse, about an hour",
      direction: "south",
    },
  ],
  createdAt: "2026-10-17T17:26:51.488Z",
  updatedAt: "2026-10-17T17:41:40.409Z",
} as const satisfies Place
