import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSeersOfItonia = {
  id: "01a0e9f7-12e8-7e2f-8fe2-72f4bad18614",
  type: "page-type/lore",
  slug: "otherwhere-v-seers-of-itonia",
  title: "The Seers of Itonia",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-seers-of-itonia",
  facts: [
    {
      fact: "The Seers of Itonia foretell from the Cave of the Seers in the mountain above Itonia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Seers guide Itonia's oligarchs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Questor Ushia founded the Seers for eternal service; the Questor Brox saw the founding.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Seers foresee by joining Ushia's Insights to a leyline under their cave.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Foretelling drains ambient magic into the Seers, and they bleed from the nose under strain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pilgrims must walk humbly up the path to the Seers to earn a good reading.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
