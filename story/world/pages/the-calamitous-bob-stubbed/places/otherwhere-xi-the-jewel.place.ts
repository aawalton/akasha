import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiTheJewel = {
  id: "01a0ea7d-f2b9-7c3f-9ddf-d8cd6b1e6554",
  type: "page-type/place",
  slug: "otherwhere-xi-the-jewel",
  title: "The Jewel",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-harrakan-remnants",
  facts: [
    {
      fact: "The Jewel is a small isle off the Remnants' coast, crowned by a fortress-manor carved from rock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Jewel has a garden of statues.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Remnant rulers held hostages on the Jewel until Harrak freed them ten years ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A treeless mining island near the Jewel holds a silverite mine.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The mining island near the Jewel has cement huts with leather doors and slums.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On the mining island near the Jewel crops grow everywhere, kelp dries, and nets hang on pillars.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
