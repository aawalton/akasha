import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVAgmon = {
  id: "01a0e9f6-77eb-7e84-b2ec-e04345321ff8",
  type: "page-type/lore",
  slug: "otherwhere-v-agmon",
  title: "Agmon",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-agmon",
  facts: [
    {
      fact: "Agmon is an orcish empire that dominates the far west of the Giantsrest continent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agmon lies across the sea of grass from Gemore, a continent's width from Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agmon fields legionaries.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Agmon\'s military is led by the Questor Ushia, whom Badud calls "the Seer".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agmon is the power Giantsrest must one day face to rule the whole continent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agmon sends genteel orcs abroad as its envoys.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
