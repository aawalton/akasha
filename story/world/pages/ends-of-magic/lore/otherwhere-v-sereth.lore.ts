import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSereth = {
  id: "01a0e9fa-ee0d-76f3-88b4-48e875c80ca6",
  type: "page-type/lore",
  slug: "otherwhere-v-sereth",
  title: "Sereth",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-sereth",
  facts: [
    {
      fact: "Sereth is a dead god, one of those the Questors killed in Ostren.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A prayer to Sereth reaches the Hierophant Phryne, who keeps the old gods' faith.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Sereth is long dead, slain in the Ending of Deicide.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
