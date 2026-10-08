import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const furnishingsGeneral = {
  id: "01a06165-9168-701c-94ec-634cb70ee5cb",
  type: "page-type/temper-collectible-category",
  slug: "furnishings-general",
  title: "General",
  parent: "temper-collectible-category/furnishings",
  collectibles: "jsonl",
  createdAt: "2026-09-02T09:14:01.448Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperCollectibleCategory
