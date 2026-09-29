import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiHush = {
  id: "01a0ea85-d3d7-7423-9096-9fb09e9cf64e",
  type: "page-type/lore",
  slug: "otherwhere-xi-hush",
  title: "Hush",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-hush",
  facts: [
    {
      fact: "Hush fights for New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "With Rakan and Iria, Hush freed the Jewel's hostages and the silverite mine island.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hush is thought to serve Harrak still this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
