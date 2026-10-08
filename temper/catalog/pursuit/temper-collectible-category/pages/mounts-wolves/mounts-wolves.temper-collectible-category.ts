import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const mountsWolves = {
  id: "01a06165-916a-7008-9c1b-c4bbf58efc6c",
  type: "page-type/temper-collectible-category",
  slug: "mounts-wolves",
  title: "Wolves",
  parent: "temper-collectible-category/mounts",
  collectibles: "jsonl",
  createdAt: "2026-09-02T09:14:01.450Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperCollectibleCategory
