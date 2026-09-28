import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereVPine = {
  id: "01a0e9ff-cb81-798d-a94d-9ac7239a26bc",
  type: "page-type/world-item",
  slug: "otherwhere-v-pine",
  title: "Pine",
  world: "world/ends-of-magic",
  description: "An evergreen needled tree.",
} as const satisfies WorldItem
