import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveMoverDiscs = {
  id: "01a0e9f4-be68-7f02-b72e-6be138b6acd8",
  type: "page-type/world-item",
  slug: "super-supportive-mover-discs",
  title: "Mover discs",
  world: "world/super-supportive",
  description: "Silver pucks that stick to objects and lift them by remote.",
} as const satisfies WorldItem
