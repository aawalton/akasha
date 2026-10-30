import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedTrialWorldOutpostYard = {
  id: "01a18d10-93f1-75e1-b21d-5881b1b7abd5",
  type: "page-type/place",
  slug: "gifted-trial-world-outpost-yard",
  title: "Outpost Yard",
  world: "world/gifted-trial-world",
  within: "place/gifted-trial-world-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-trial-world-outpost-common-room",
      way: "Up the wooden steps and in at the front doors.",
    },
    { to: "place/gifted-trial-world-outpost-kitchen", way: "In at the back door." },
    {
      to: "place/gifted-trial-world-outpost-stable",
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
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies Place
