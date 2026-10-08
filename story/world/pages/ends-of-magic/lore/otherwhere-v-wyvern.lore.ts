import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVWyvern = {
  id: "01a0e9f8-f7c7-708b-b029-0f0936369288",
  type: "page-type/lore",
  slug: "otherwhere-v-wyvern",
  title: "Wyvern",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-wyvern",
  facts: [
    {
      fact: 'Wyverns are flying beasts; "a score of wyverns" means a dangerous swarm in the air.',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:43:22.823Z",
  updatedAt: "2026-09-28T21:43:25.000Z",
} as const satisfies Lore
