import type { TemperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.types.ts"

export const appearanceFacialHair = {
  id: "01a06165-9164-7005-94c6-d6b86a0e266f",
  type: "page-type/temper-collectible-category",
  slug: "appearance-facial-hair",
  title: "Facial Hair",
  parent: "temper-collectible-category/appearance",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
