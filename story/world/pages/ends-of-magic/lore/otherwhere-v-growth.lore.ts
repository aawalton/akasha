import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVGrowth = {
  id: "01a0ea0c-c3f0-7d26-b084-99673a9137b0",
  type: "page-type/lore",
  slug: "otherwhere-v-growth",
  title: "Growth",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-growth",
  facts: [
    {
      fact: "People grow stronger and more skilled by overcoming hard things.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
