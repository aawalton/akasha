import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiOneLeg = {
  id: "01a0ea84-282a-701c-945b-da39bfeb2dbc",
  type: "page-type/lore",
  slug: "otherwhere-xi-one-leg",
  title: "One-Leg",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-one-leg",
  facts: [
    {
      fact: "One-Leg is a villager of a young frontier village at the northern edge of the Deadshield.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One-Leg lived through the siege of the village by Octas' Herald and her spiders.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season One-Leg lives in that village, some fifteen years on.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
