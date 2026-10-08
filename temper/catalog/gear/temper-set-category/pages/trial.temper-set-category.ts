import type { TemperSetCategory } from "akasha/temper/catalog/gear/temper-set-category/temper-set-category.page-type.types.ts"

export const trial = {
  id: "019e46b5-0db6-76a8-a3b8-c1c40757631f",
  type: "page-type/temper-set-category",
  slug: "trial",
  title: "Trial",
  key: "trial",
  displayOrder: 1,
  activity: "temper-activity-category/trials",
  esoCategoryNames: ["Trials"],
  createdAt: "2026-05-20T18:45:31.190Z",
  updatedAt: "2026-09-27T04:12:39.000Z",
} as const satisfies TemperSetCategory
