import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSkliasDominion = {
  id: "01a0ea02-5e4c-7bed-bff3-e0d79c4b4004",
  type: "page-type/lore",
  slug: "otherwhere-v-sklias-dominion",
  title: "The Sklias Dominion",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-sklias-dominion",
  facts: [
    {
      fact: "The fallen Sklias Dominion left dungeons of serpentine architecture.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:53:38.892Z",
  updatedAt: "2026-09-28T21:53:43.000Z",
} as const satisfies Lore
