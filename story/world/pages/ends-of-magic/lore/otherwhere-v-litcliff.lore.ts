import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLitcliff = {
  id: "01a0e9f6-77eb-7452-b057-c789bab5650c",
  type: "page-type/lore",
  slug: "otherwhere-v-litcliff",
  title: "Litcliff",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-litcliff",
  facts: [
    {
      fact: 'Litcliff is ruled by "peers" from a palace in the city.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Litcliff is a port and a route off the Giantsrest continent, and Sago ships call there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Litcliff keeps an ancient artifact that calms the waves about it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
