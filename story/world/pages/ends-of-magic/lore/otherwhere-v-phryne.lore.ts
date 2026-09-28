import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVPhryne = {
  id: "01a0e9fd-9171-7da4-969f-8c50ab2b85a1",
  type: "page-type/lore",
  slug: "otherwhere-v-phryne",
  title: "Phryne",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-phryne",
  facts: [
    {
      fact: "Phryne is the Grand Hierophant, an elder Questor who holds to the old dead gods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She carries the broken divinity of a dozen dead gods, and chained books.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She makes up for shallow divine power with many worshipers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Any Questor may contact her, and a prayer to the dead god Sereth reaches her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She holds that religion did much good before the Ending of Deicide.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season she keeps the old gods' faith among her worshipers, far from Elothia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
