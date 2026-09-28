import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVExeaDhaHumal = {
  id: "01a0e9fb-2816-7400-a16d-79efb9b83cdf",
  type: "page-type/lore",
  slug: "otherwhere-v-exea-dha-humal",
  title: "Exea dha Humal",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-exea-dha-humal",
  facts: [
    {
      fact: "Exea dha Humal is an old, cruel Giantsrest archmage who governs the fortress-city of Halsmet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She keeps hoards of artifacts and thousands of slaves, and has some grasp of wizardry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is likened to a crone of the fey.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Exea rules Halsmet, between Giantsrest and Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
