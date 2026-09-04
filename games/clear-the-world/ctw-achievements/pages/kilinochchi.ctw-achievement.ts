import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const kilinochchi = {
  id: "019dbb6d-c3e8-7070-9f07-1abdbc5d5f58",
  pageTypeSlug: "ctw-achievement",
  slug: "kilinochchi",
  title: "Kilinochchi",
  scope: "team",
  metric: "team_cells_cleared",
  threshold: 100000,
} as const satisfies CtwAchievement
