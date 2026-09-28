import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveNesicard = {
  id: "01a0e9f3-f5f7-7b05-804d-4b3709be8a27",
  type: "page-type/world-item",
  slug: "super-supportive-nesicard",
  title: "NesiCard",
  world: "world/super-supportive",
  description: "An enchanted Anesidoran debit card.",
} as const satisfies WorldItem
