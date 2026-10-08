import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVGemoreAdventurersGuild = {
  id: "01a0e9f4-7b7e-7559-85ef-6e720a9ecd34",
  type: "page-type/place",
  slug: "otherwhere-v-gemore-adventurers-guild",
  title: "The Adventurer's Guild Hall of Gemore",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-gemore",
  facts: [
    {
      fact: "The Adventurer's Guild of Gemore keeps a hall with a courtyard in the city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hall's courtyard has been the muster ground of Gemore's Adventurers since the founding.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:38:28.862Z",
  updatedAt: "2026-09-28T21:38:33.000Z",
} as const satisfies Place
