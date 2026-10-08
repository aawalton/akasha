import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const residualRisk = {
  id: "019dbb6d-ed3e-775b-ba18-91c3bf38c6e8",
  type: "page-type/ctw-achievement",
  slug: "residual-risk",
  title: "Residual Risk",
  scope: "team",
  metric: "team_crater_rate",
  threshold: 10000,
  createdAt: "2026-04-23T17:40:36.798Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
