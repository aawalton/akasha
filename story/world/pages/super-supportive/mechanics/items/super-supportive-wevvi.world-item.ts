import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveWevvi = {
  id: "01a0e9f4-be68-7ac7-8c07-23be94dbc395",
  type: "page-type/world-item",
  slug: "super-supportive-wevvi",
  title: "Wevvi",
  world: "world/super-supportive",
  description: "A spiced fruit drink tasting like eggnog.",
} as const satisfies WorldItem
