import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveYatangerTriangle = {
  id: "01a0e9fc-be82-76af-a4b2-c1b799140ee2",
  type: "page-type/world-item",
  slug: "super-supportive-yatanger-triangle",
  title: "Yatanger triangle",
  world: "world/super-supportive",
  description: "A raised triangular casting platform with stained ingredient dimples.",
} as const satisfies WorldItem
