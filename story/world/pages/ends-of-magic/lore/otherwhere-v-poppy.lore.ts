import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVPoppy = {
  id: "01a0e9fe-d7c0-71e3-8725-1d746491ac51",
  type: "page-type/lore",
  slug: "otherwhere-v-poppy",
  title: "Poppy",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-poppy",
  facts: [
    {
      fact: "Poppy is a chemist of Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Poppy works as a chemist in Gemore, far from Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
