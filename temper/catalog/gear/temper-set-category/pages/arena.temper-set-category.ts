import type { TemperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.types.ts"

export const arena = {
  id: "019e46b5-0dbd-7210-a89e-8bb2b35a6ad9",
  type: "page-type/temper-set-category",
  slug: "arena",
  title: "Arena",
  key: "arena",
  displayOrder: 3,
  activity: "temper-activity-category/arenas",
  esoCategoryNames: ["Arenas", "Infinite Archive"],
  nestedEsoCategoryNames: ["Infinite Archive"],
  createdAt: "2026-05-20T18:45:31.197Z",
  updatedAt: "2026-09-27T04:27:04.000Z",
} as const satisfies TemperSetCategory
