import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVThreeHeadedCentipede = {
  id: "01a0e9ff-2b3d-75ff-997b-dab7f693fdbb",
  type: "page-type/lore",
  slug: "otherwhere-v-three-headed-centipede",
  title: "Three-Headed Centipede",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-three-headed-centipede",
  facts: [
    {
      fact: "A three-headed centipede grows to about thirty feet long.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A three-headed centipede spits sticky goo.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Three-headed centipedes roam the wilds of the continent of Esebus.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
