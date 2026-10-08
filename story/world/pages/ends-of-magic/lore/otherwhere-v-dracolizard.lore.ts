import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVDracolizard = {
  id: "01a0e9f8-965e-7052-9329-b2fc13974c65",
  type: "page-type/lore",
  slug: "otherwhere-v-dracolizard",
  title: "Dracolizard",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-dracolizard",
  facts: [
    {
      fact: "Dracolizards are beasts so big that eating a whole one is a joking boast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"I\'ll eat an entire dracolizard if it does" is said of a thing thought impossible.',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T21:42:57.886Z",
  updatedAt: "2026-09-28T21:43:00.000Z",
} as const satisfies Lore
