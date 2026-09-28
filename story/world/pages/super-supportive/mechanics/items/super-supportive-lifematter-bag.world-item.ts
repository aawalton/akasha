import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveLifematterBag = {
  id: "01a0e9fc-0701-78ba-b07e-3b77087a00c3",
  type: "page-type/world-item",
  slug: "super-supportive-lifematter-bag",
  title: "Lifematter bag",
  world: "world/super-supportive",
  description: "A weighted training bag.",
} as const satisfies WorldItem
