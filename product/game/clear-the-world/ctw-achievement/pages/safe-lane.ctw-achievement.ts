import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const safeLane = {
  id: "019dbb6d-929f-776f-b9b7-cd5f05210f33",
  type: "page-type/ctw-achievement",
  slug: "safe-lane",
  title: "Safe Lane",
  scope: "profile",
  metric: "session_cells_zero_craters",
  threshold: 1000,
  createdAt: "2026-04-23T17:40:13.599Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
