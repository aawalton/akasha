import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVQuaz = {
  id: "01a0ea02-5e4c-7169-bcf3-6719a820929c",
  type: "page-type/lore",
  slug: "otherwhere-v-quaz",
  title: "Quaz",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-quaz",
  facts: [
    {
      fact: "Quaz was one of the great ancient empires of Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Quaz arose to suppress the undead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kalis later surpassed Quaz.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:53:38.892Z",
  updatedAt: "2026-09-28T21:53:43.000Z",
} as const satisfies Lore
