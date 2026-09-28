import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveHazardMimic = {
  id: "01a0e9fc-0701-7dfc-84a7-f527f9e6a59b",
  type: "page-type/world-item",
  slug: "super-supportive-hazard-mimic",
  title: "Hazard mimic",
  world: "world/super-supportive",
  description:
    "An expandable, rubbery training polyhedron on four pointed legs that charges or flees like a creature.",
} as const satisfies WorldItem
