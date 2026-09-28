import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVShom = {
  id: "01a0e9fe-d7c0-7518-87c8-704a137ac0fb",
  type: "page-type/lore",
  slug: "otherwhere-v-shom",
  title: "Shom",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-shom",
  facts: [
    {
      fact: "Shom is a mortal of Halsmet, the fortress-city between Giantsrest and Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Shom lives in Halsmet under the archmage Exea dha Humal.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
