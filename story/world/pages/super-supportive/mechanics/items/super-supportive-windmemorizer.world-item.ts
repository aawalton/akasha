import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveWindmemorizer = {
  id: "01a0e9fc-0701-71b2-9200-702850d62c0f",
  type: "page-type/world-item",
  slug: "super-supportive-windmemorizer",
  title: "Windmemorizer",
  world: "world/super-supportive",
  description: "A surfboard with sails of light that can turn, lift over obstacles and speed.",
} as const satisfies WorldItem
