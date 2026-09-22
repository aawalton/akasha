import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const fragmentsAurielicQuasigriff = {
  id: "01a06165-9167-700a-b12e-96bede95694d",
  type: "page-type/temper-collectible-category",
  slug: "fragments-aurielic-quasigriff",
  title: "Aurielic Quasigriff",
  parent: "temper-collectible-category/fragments",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
