import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVHibor = {
  id: "01a0e9fb-eb72-7cde-a279-d35dbc86b805",
  type: "page-type/lore",
  slug: "otherwhere-v-hibor",
  title: "Hibor",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-hibor",
  facts: [
    {
      fact: "Hibor is a student of the Ascendant Academy of Giantsrest, and Roni's best friend.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Hibor studies at the Academy with Yelun and Roni.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
