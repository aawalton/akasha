import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVQuests = {
  id: "01a0e9fc-578a-73b3-b5ea-4b9b32cb126b",
  type: "page-type/lore",
  slug: "otherwhere-v-quests",
  title: "Quests",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-quests",
  facts: [
    {
      fact: "In this age Davrar sets no Quests with rewards; people choose their own deeds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:47:03.946Z",
  updatedAt: "2026-09-28T21:47:07.000Z",
} as const satisfies Lore
