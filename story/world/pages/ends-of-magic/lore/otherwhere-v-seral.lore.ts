import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSeral = {
  id: "01a0e9fe-d7c0-7a12-9360-334b0276ad35",
  type: "page-type/lore",
  slug: "otherwhere-v-seral",
  title: "Seral",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-seral",
  facts: [
    {
      fact: "Seral is a bestial mortal brawler.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Seral is an unknown fighter, far from Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
