import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVEril = {
  id: "01a0e9fa-40da-705e-a30e-4dbacc163b89",
  type: "page-type/lore",
  slug: "otherwhere-v-eril",
  title: "Eril",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-eril",
  facts: [
    {
      fact: "Eril is a Questor who has not yet come to Davrar in this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
