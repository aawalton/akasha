import type { TemperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.types.ts"

export const monster = {
  id: "019e46b5-0dc3-71ff-a97e-cdf4f55ab557",
  type: "page-type/temper-set-category",
  slug: "monster",
  title: "Monster",
  key: "monster",
  displayOrder: 6,
  activity: "temper-activity-category/group-dungeons",
  createdAt: "2026-05-20T18:45:31.203Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperSetCategory
