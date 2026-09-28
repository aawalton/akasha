import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVFaline = {
  id: "01a0e9fb-2816-76fe-9d56-35d219d261f9",
  type: "page-type/lore",
  slug: "otherwhere-v-faline",
  title: "Faline",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-faline",
  facts: [
    {
      fact: "Faline is a shapeshifter and assassin of Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her bard skills sense pivotal moments of Fate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She has spent years spying in Giantsrest, killing rarely.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Faline serves the Assassins of Gemore, often disguised within Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
