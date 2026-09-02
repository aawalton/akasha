import type { TemperSourceCategory } from "../temper-source-category.page-type.ts"

export const baseStats = {
  id: "01a05fc5-169a-72f1-8e77-5444f4ea9d32",
  pageTypeSlug: "temper-source-category",
  slug: "base-stats",
  title: "Base Stats",
  displayOrder: 1,
  categoryId: "base",
} as const satisfies TemperSourceCategory
