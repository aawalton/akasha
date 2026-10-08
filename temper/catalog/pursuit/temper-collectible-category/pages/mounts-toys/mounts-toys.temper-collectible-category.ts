import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsToys = {
  id: "01a06165-916a-7004-a6c7-ee329c2213d9",
  type: "page-type/temper-collectible-category",
  slug: "mounts-toys",
  title: "Toys",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
  createdAt: "2026-09-02T09:14:01.450Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperCollectibleCategory
