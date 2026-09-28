import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDennar = {
  id: "01a0e9f9-d8c4-77cf-9d22-060569df67e7",
  type: "page-type/lore",
  slug: "otherwhere-v-dennar",
  title: "Dennar",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-dennar",
  facts: [
    {
      fact: "Dennar is an old archmage of Giantsrest's Ascendant Council.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His office lies beneath Drozahn, the Academy spire, full of singing sculptures.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Dennar is among the council's senior archmages in the capital.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
