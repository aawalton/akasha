import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const shieldOfTheLamb = {
  id: "01a0655a-7b7f-7f94-96da-268327e3ae32",
  type: "page-type/world-item",
  slug: "shield-of-the-lamb",
  title: "Shield of the Lamb",
  world: "world/the-wandering-inn",
} as const satisfies WorldItem
