import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveIngredientPouch = {
  id: "01a0e9fc-0701-7f93-b252-dadd5da5a39f",
  type: "page-type/world-item",
  slug: "super-supportive-ingredient-pouch",
  title: "Ingredient pouch",
  world: "world/super-supportive",
  description:
    "A handleless pouch like damp black leaves that holds baseball-sized objects without a lump.",
  createdAt: "2026-09-28T21:46:43.329Z",
  updatedAt: "2026-09-28T21:46:46.000Z",
} as const satisfies WorldItem
