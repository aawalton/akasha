import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const mountsWolves = {
  id: "01a06165-916a-7008-9c1b-c4bbf58efc6c",
  pageTypeSlug: "temper-collectible-category",
  slug: "mounts-wolves",
  title: "Wolves",
  parent: "mounts",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
