import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveStunner = {
  id: "01a0e9f8-6bb4-7a55-87e5-eda568f38036",
  type: "page-type/world-item",
  slug: "super-supportive-stunner",
  title: "stunner",
  world: "world/super-supportive",
  description: "An arm brace with an articulated glove that knocks people out.",
} as const satisfies WorldItem
