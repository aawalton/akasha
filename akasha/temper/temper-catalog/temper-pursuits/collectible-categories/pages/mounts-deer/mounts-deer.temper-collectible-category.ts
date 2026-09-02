import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsDeer = {
  id: "01a06165-9169-700c-a2a6-6f5db14ebe82",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-deer",
  title: "Deer",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
