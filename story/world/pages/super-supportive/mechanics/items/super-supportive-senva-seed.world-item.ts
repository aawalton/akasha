import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveSenvaSeed = {
  id: "01a0e9f9-1fa2-7525-900e-0cb4e5215ef3",
  type: "page-type/world-item",
  slug: "super-supportive-senva-seed",
  title: "senva seed",
  world: "world/super-supportive",
  description: "A seed like a scrambled dandelion that smells of basil.",
} as const satisfies WorldItem
