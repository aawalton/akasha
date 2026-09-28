import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVBinga = {
  id: "01a0e9f8-0f1b-7cea-98e6-bc3e75f1192c",
  type: "page-type/lore",
  slug: "otherwhere-v-binga",
  title: "Binga",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-binga",
  facts: [
    {
      fact: "Binga is a Questor of the Ashen Accord.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Binga belongs to the Accord, far from Giantsrest's continent.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
