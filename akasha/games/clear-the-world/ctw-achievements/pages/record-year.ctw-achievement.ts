import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const recordYear = {
  id: "019dbb6e-0ce2-7eab-83c0-b9aebe11d8f8",
  pageTypeSlug: "ctw-achievement",
  slug: "record-year",
  title: "Record Year",
  scope: "global",
  metric: "global_cells_cleared",
  threshold: 1000000000,
  description:
    "In 2023, global mine action programmes cleared a record 281.5 square kilometres of contaminated land — the most in any single year since systematic tracking began. One billion cells equals 1,000 km², nearly four times that record.",
} as const satisfies CtwAchievement
