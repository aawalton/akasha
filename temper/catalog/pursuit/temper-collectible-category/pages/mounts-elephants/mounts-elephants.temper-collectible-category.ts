import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsElephants = {
  id: "01a06165-9169-700f-8c28-94aeab9d0be6",
  type: "page-type/temper-collectible-category",
  slug: "mounts-elephants",
  title: "Elephants",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
  createdAt: "2026-09-02T09:14:01.449Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperCollectibleCategory
