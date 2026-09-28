import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDavion = {
  id: "01a0e9f9-65e0-7ce1-ae22-64c3e701f2f2",
  type: "page-type/lore",
  slug: "otherwhere-v-davion",
  title: "Davion",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-davion",
  facts: [
    {
      fact: "Davion is a man of Litcliff, the southern port, who sails with a Sago ship.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Davion is about Litcliff's harbor and its ships.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
