import type { CtwAchievement } from "akasha/products/games/clear-the-world/ctw-achievements/ctw-achievement.page-type.types.ts"

export const kilinochchi = {
  id: "019dbb6d-c3e8-7070-9f07-1abdbc5d5f58",
  type: "ctw-achievement",
  slug: "kilinochchi",
  title: "Kilinochchi",
  scope: "team",
  metric: "team_cells_cleared",
  threshold: 100000,
} as const satisfies CtwAchievement
