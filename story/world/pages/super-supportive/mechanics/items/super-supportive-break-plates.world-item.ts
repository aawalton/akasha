import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveBreakPlates = {
  id: "01a0e9fc-0700-70cd-9492-c6687c6e983f",
  type: "page-type/world-item",
  slug: "super-supportive-break-plates",
  title: "Break plates",
  world: "world/super-supportive",
  description:
    "Protective tiles stuck to a black safety suit; some soften impacts, some dull magical effects.",
} as const satisfies WorldItem
