import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const kilinochchi = {
  id: "019dbb6d-c3e8-7070-9f07-1abdbc5d5f58",
  type: "page-type/ctw-achievement",
  slug: "kilinochchi",
  title: "Kilinochchi",
  scope: "team",
  metric: "team_cells_cleared",
  threshold: 100000,
  createdAt: "2026-04-23T17:40:26.216Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
