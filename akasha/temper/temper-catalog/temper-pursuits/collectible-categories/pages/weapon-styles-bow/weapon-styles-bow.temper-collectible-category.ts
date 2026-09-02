import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const weaponStylesBow = {
  id: "01a06165-916a-701f-b616-55da1fb0b725",
  pageTypeSlug: "temper-collectible-category",
  slug: "weapon-styles-bow",
  title: "Bow",
  parent: "weapon-styles",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
