import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVJadya = {
  id: "01a0e9fc-4337-704f-83d9-fb53168fdd6d",
  type: "page-type/lore",
  slug: "otherwhere-v-jadya",
  title: "Jadya",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-jadya",
  facts: [
    {
      fact: "Jadya is a person of Gemore with no public mark in this season.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
