import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const recordYear = {
  id: "019dbb6e-0ce2-7eab-83c0-b9aebe11d8f8",
  type: "page-type/ctw-achievement",
  slug: "record-year",
  title: "Record Year",
  scope: "global",
  metric: "global_cells_cleared",
  threshold: 1000000000,
  description:
    "In 2023, global mine action programmes cleared a record 281.5 square kilometres of contaminated land — the most in any single year since systematic tracking began. One billion cells equals 1,000 km², nearly four times that record.",
  createdAt: "2026-04-23T17:40:44.898Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
