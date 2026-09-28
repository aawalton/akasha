import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVKia = {
  id: "01a0e9fd-3be3-7aa3-aef1-ec030cc0b054",
  type: "page-type/lore",
  slug: "otherwhere-v-kia",
  title: "Kia",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-kia",
  facts: [
    {
      fact: "Kia is a woman of Gemore, adoptive mother of the young wolfman Khachi.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Kia lives in Gemore, raising Khachi.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
