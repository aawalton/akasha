import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrial2WorldOutpostYard = {
  id: "01a18dab-06cd-7238-9f8f-6bc6bfae68c8",
  type: "page-type/place",
  slug: "gifted-trial2-world-outpost-yard",
  title: "Outpost Yard",
  world: "world/gifted-trial2-world",
  within: "place/gifted-trial2-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial2-world-outpost-common-room",
      way: "Up the wooden steps and in at the front doors.",
    },
    { to: "place/gifted-trial2-world-outpost-kitchen", way: "In at the back door." },
    {
      to: "place/gifted-trial2-world-outpost-stable",
      way: "Across to the shed beside the building.",
    },
  ],
  facts: [
    {
      fact: "Solid wooden steps climb from the yard to the outpost's front doors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cleared ground runs out a field's width to the treeline of Horndale pines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The pass road runs past the front, east down to Dinalby and west over to Meravia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Behind the outpost is a fenced vegetable and herb garden, under snow in winter.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A creek runs past below the cleared ground.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies Place
