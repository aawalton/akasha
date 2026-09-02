import type { TemperLoreCollection } from "../../temper-lore-collection.page-type.ts"

export const literature = {
  id: "01a06343-f9fa-7095-ae72-d6f47e09caeb",
  pageTypeSlug: "temper-lore-collection",
  slug: "literature",
  title: "Literature",
  esoLoreCategoryId: 1,
  esoCollectionIndex: 14,
  books: "jsonl",
} as const satisfies TemperLoreCollection
