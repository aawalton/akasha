import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const blueBoxesTallowmereNorthGate = {
  id: "01a14af5-008e-7130-a3fe-2d35ae084639",
  type: "page-type/place",
  slug: "blue-boxes-tallowmere-north-gate",
  title: "Tallowmere North Gate",
  world: "world/blue-boxes",
  within: "place/blue-boxes-tallowmere",
  facts: [
    {
      fact: "A squat stone gatehouse with oak doors banded in iron, and a bell hung under its arch.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A brazier burns beside the doors from the bell till dawn; the warden's stool sits by it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Past full dark the doors stay shut; a wicket in them opens for the warden's say alone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inside, a cobbled lane runs down to the market square and the fair stalls.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  exits: [
    {
      to: "place/blue-boxes-fallen-wayshrine",
      way: "out the gate and up the sheep track through the gorse, about an hour",
      direction: "north",
    },
    {
      way: "down the cobbled lane to the market square",
      direction: "south",
    },
  ],
  createdAt: "2026-10-17T17:42:12.876Z",
  updatedAt: "2026-10-17T17:42:12.876Z",
} as const satisfies Place
