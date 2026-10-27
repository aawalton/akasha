import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVGrowth = {
  id: "01a0ea0c-c3f0-7d26-b084-99673a9137b0",
  type: "page-type/lore",
  slug: "otherwhere-v-growth",
  title: "Growth",
  world: "world/ends-of-magic",
  about: "world/ends-of-magic",
  facts: [
    {
      fact: "People grow stronger and more skilled by overcoming hard things.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T22:05:00.272Z",
  updatedAt: "2026-10-27T19:32:30.855Z",
} as const satisfies Lore
