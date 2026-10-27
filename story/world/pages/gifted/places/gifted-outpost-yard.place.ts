import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const giftedOutpostYard = {
  id: "01a17edb-c5db-7968-8fc6-f2e34d215c56",
  type: "page-type/place",
  slug: "gifted-outpost-yard",
  title: "Outpost Yard",
  world: "world/gifted",
  within: "place/gifted-horndale-outpost",
  depth: 0,
  exits: [
    {
      to: "place/gifted-outpost-common-room",
      way: "Up the wooden steps and in at the front doors.",
    },
    { to: "place/gifted-outpost-kitchen", way: "In at the back door." },
    { to: "place/gifted-outpost-stable", way: "Across to the shed beside the building." },
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
  createdAt: "2026-10-27T19:34:54.679Z",
  updatedAt: "2026-10-27T19:34:54.679Z",
} as const satisfies Place
