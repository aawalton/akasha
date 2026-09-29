import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSimpleWilly = {
  id: "01a0ea87-7ebc-7a7d-9e6d-63bf4133b530",
  type: "page-type/lore",
  slug: "otherwhere-xi-simple-willy",
  title: "Simple Willy",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-simple-willy",
  facts: [
    {
      fact: "Simple Willy is a villager of a young frontier village at the northern edge of the Deadshield.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Simple Willy lived through the siege of the village by Octas' Herald.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Simple Willy lives in that village, some fifteen years on.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
