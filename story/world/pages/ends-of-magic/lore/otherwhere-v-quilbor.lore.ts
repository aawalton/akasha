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
} as const satisfies Lore
