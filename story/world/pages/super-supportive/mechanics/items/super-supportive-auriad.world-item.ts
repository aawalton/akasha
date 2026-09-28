import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveAuriad = {
  id: "01a0e9f3-f5f6-7b5c-b0fc-b2d1a5050877",
  type: "page-type/world-item",
  slug: "super-supportive-auriad",
  title: "Auriad",
  world: "world/super-supportive",
  description: "A loop of iridescent string that bonds to its owner's authority.",
} as const satisfies WorldItem
