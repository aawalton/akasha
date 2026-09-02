import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsBears = {
  id: "01a06165-9169-7008-80fb-4590bbc96fcb",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-bears",
  title: "Bears",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
