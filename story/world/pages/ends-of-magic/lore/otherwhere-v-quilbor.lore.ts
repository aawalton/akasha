import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVQuilbor = {
  id: "01a0e9fa-e2ae-756d-ab3a-389d8b1ab046",
  type: "page-type/lore",
  slug: "otherwhere-v-quilbor",
  title: "Quilbor",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-quilbor",
  facts: [
    {
      fact: "Quilbor keeps scry-covens that scry across the seas.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Quilbor sails ships of its own.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  createdAt: "2026-09-28T21:45:28.494Z",
  updatedAt: "2026-09-28T21:45:31.000Z",
} as const satisfies Lore
