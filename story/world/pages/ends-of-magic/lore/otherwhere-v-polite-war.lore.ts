import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVPoliteWar = {
  id: "01a0e9fe-b555-765a-bc0a-ad7e5a628abb",
  type: "page-type/lore",
  slug: "otherwhere-v-polite-war",
  title: "Polite War",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-polite-war",
  facts: [
    {
      fact: "Questor factions settle quarrels in Polite Wars, formal wars under terms Davrar enforces.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:49:39.029Z",
  updatedAt: "2026-09-28T21:49:45.000Z",
} as const satisfies Lore
