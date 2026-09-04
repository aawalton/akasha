import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const safeLane = {
  id: "019dbb6d-929f-776f-b9b7-cd5f05210f33",
  pageTypeSlug: "ctw-achievement",
  slug: "safe-lane",
  title: "Safe Lane",
  scope: "profile",
  metric: "session_cells_zero_craters",
  threshold: 1000,
} as const satisfies CtwAchievement
