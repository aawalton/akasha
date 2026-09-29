import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiIria = {
  id: "01a0ea87-2a4e-7bed-b6b3-544c1a78ecc5",
  type: "page-type/lore",
  slug: "otherwhere-xi-iria",
  title: "Iria",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-iria",
  facts: [
    {
      fact: "Iria fights for New Harrak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "With Rakan and Hush, Iria freed the Jewel's hostages and the silverite mine island.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Iria is thought to serve Harrak still this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
