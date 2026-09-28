import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVHillboar = {
  id: "01a0e9f8-965f-7495-958d-f6c01ecc3a04",
  type: "page-type/lore",
  slug: "otherwhere-v-hillboar",
  title: "Hillboar",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-hillboar",
  facts: [
    {
      fact: "Hillboars roam the wilds of Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hillboars are bigger, deadlier game than dragonwolves, a prize even for a Questor.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
