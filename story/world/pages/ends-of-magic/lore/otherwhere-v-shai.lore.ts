import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVShai = {
  id: "01a0e9f9-91ed-7a79-b34d-a28a0233e1e5",
  type: "page-type/lore",
  slug: "otherwhere-v-shai",
  title: "Shai",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-shai",
  facts: [
    {
      fact: "Shai is a person of Halsmet, a fortress-city between Giantsrest and Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Shai lives in Halsmet under the archmage Exea dha Humal.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
