import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVStanel = {
  id: "01a0e9fe-3d10-71ea-b48b-f0aa79dee76e",
  type: "page-type/lore",
  slug: "otherwhere-v-stanel",
  title: "Stanel",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-stanel",
  facts: [
    {
      fact: "Stanel is a jovial man of Gemore, father of the twins Sarah and Aarl.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Like other well-off Gemore parents, he has bought his children fine gear.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Stanel lives in Gemore, where his children are young adventurers.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
