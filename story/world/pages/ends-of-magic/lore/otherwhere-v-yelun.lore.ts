import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVYelun = {
  id: "01a0e9f9-115f-7ff9-ae0e-05c2cfb799cb",
  type: "page-type/lore",
  slug: "otherwhere-v-yelun",
  title: "Yelun",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-yelun",
  facts: [
    {
      fact: "Yelun is a young woman studying at the Ascendant Academy of Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her father taught her that mages need loyal helpers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She has a brother who sends her [Message] spells.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season she studies at the Academy in Giantsrest with her friends Roni and Hibor.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:43:29.375Z",
  updatedAt: "2026-09-28T21:43:32.000Z",
} as const satisfies Lore
