import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsDeer = {
  id: "01a06165-9169-700c-a2a6-6f5db14ebe82",
  type: "page-type/temper-collectible-category",
  slug: "mounts-deer",
  title: "Deer",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
  createdAt: "2026-09-02T09:14:01.449Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperCollectibleCategory
