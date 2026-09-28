import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVDriftmere = {
  id: "01a0e9f9-26eb-746b-8ad7-30c3fff3a77d",
  type: "page-type/place",
  slug: "otherwhere-v-driftmere",
  title: "Driftmere",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-ostren",
  facts: [
    {
      fact: "Driftmere is a port town carved into a huge rock floating above the sea off Ostren.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Driftmere sits where floating rocks crowd so thick one could almost walk across them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A floating dock below links to the rock by flexible ladders and stairs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inside, Driftmere is spacious, ancient and worn, and bustling with trade.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A transit station atop the rock holds dozens of driftboats.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Driftboats fly from Driftmere to the port city of Galdon.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
