import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveWorldKeeper = {
  id: "01a0e9fc-0701-75a0-9696-417e1cfa990d",
  type: "page-type/world-item",
  slug: "super-supportive-world-keeper",
  title: "World keeper",
  world: "world/super-supportive",
  description:
    "A huge reflective folded object set ahead of spreading corruption to preserve a small part of a region.",
} as const satisfies WorldItem
