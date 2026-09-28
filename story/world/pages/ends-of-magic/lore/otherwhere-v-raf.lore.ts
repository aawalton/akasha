import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVRaf = {
  id: "01a0e9f9-91ed-7fee-804f-6bedba25a5db",
  type: "page-type/lore",
  slug: "otherwhere-v-raf",
  title: "Raf",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-raf",
  facts: [
    {
      fact: "Raf is an angry youth of Halsmet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Raf lives in Halsmet, a fortress-city ruled by the archmage Exea dha Humal.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
