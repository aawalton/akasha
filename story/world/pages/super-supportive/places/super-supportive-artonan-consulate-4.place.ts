import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const superSupportiveArtonanConsulate4 = {
  id: "01a0e9f9-7c06-7665-bc39-345181cd44b0",
  type: "page-type/place",
  slug: "super-supportive-artonan-consulate-4",
  title: "Artonan Consulate 4",
  world: "world/super-supportive",
  facts: [
    {
      fact: "Artonan Consulate 4, USA is Chicago's Artonan consulate, in a business district.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "From Lawrence it is about half an hour south on the Red Line, then a short walk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On a Saturday the lobby opens at nine with no classes, and Gorgon is at the desk as always.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a blocky gray concrete-and-glass cube behind a security fence with a gate on tracks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Three poles out front fly multicolored streamers, the Artonans' planetary flags.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The lobby has pale terrazzo floors and a dark wood ceiling of LEDs mapping Artonan stars.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  within: "place/otherwhere-iii-chicago",
  secrets: "jsonl",
} as const satisfies Place
