import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const blueBoxesTallowmere = {
  id: "01a14ae6-f163-7150-8fa6-1d08d3273e2f",
  type: "page-type/place",
  slug: "blue-boxes-tallowmere",
  title: "Tallowmere",
  world: "world/blue-boxes",
  facts: [
    {
      fact: "Tallowmere is a walled market town on a slow river, known for candles, wool and its autumn fair.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It has an adventurers' guild hall, a temple to the greater gods, and no shrine to Iris.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Townsfolk call the System a thing, never a someone; talking back to it is a sign of fever.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From the hill it shows as walls, a river shining like a ribbon, and a hundred chimneys.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The gate bell rings once an hour before dusk; the gates shut at full dark and open at dawn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The north gate faces the sheep track; its warden asks a stranger's name and business.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The autumn fair runs this week, so every inn bed is taken and the town stays loud late.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stranger with no coin may sleep on the temple porch or in the guild hall's common room.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  exits: [
    {
      to: "place/blue-boxes-fallen-wayshrine",
      way: "up the sheep track through the gorse to the hilltop, about an hour",
      direction: "north",
    },
  ],
  createdAt: "2026-10-17T17:26:51.488Z",
  updatedAt: "2026-10-17T17:41:40.409Z",
} as const satisfies Place
