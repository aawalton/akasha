import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiGorok = {
  id: "01a0ea7c-307a-7d58-9001-46293f9d2ab5",
  type: "page-type/lore",
  slug: "otherwhere-xi-gorok",
  title: "Gorok",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-gorok",
  facts: [
    {
      fact: "Gorok is an old god called the Butcher and the Tyrant.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gorok returned after his death as the god of aberrants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The light gods deem Gorok beyond redemption.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
