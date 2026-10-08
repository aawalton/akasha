import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVRoni = {
  id: "01a0e9f9-115f-77ee-9a5b-9304a5ffae23",
  type: "page-type/lore",
  slug: "otherwhere-v-roni",
  title: "Roni",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-roni",
  facts: [
    {
      fact: "Roni is a companion of Yelun of the Academy of Giantsrest, and Hibor's best friend.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Roni lives in Giantsrest among the Academy's students.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:43:29.375Z",
  updatedAt: "2026-09-28T21:43:32.000Z",
} as const satisfies Lore
