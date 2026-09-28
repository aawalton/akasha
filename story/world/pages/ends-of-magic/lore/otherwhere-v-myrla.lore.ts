import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVMyrla = {
  id: "01a0e9fa-2b5f-7f5a-b40f-75ded0e5038f",
  type: "page-type/lore",
  slug: "otherwhere-v-myrla",
  title: "Myrla",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-myrla",
  facts: [
    {
      fact: "Myrla is a brave mortal, known in this season only to those close by, far from Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
