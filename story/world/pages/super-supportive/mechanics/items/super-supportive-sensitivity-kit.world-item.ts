import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveSensitivityKit = {
  id: "01a0e9fc-0701-774a-b398-54c54011e70c",
  type: "page-type/world-item",
  slug: "super-supportive-sensitivity-kit",
  title: "Sensitivity training kit",
  world: "world/super-supportive",
  description: "A set of ingredients for practising the sense of spell-relevant properties.",
} as const satisfies WorldItem
