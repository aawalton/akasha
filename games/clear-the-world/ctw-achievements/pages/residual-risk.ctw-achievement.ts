import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const residualRisk = {
  id: "019dbb6d-ed3e-775b-ba18-91c3bf38c6e8",
  pageTypeSlug: "ctw-achievement",
  slug: "residual-risk",
  title: "Residual Risk",
  scope: "team",
  metric: "team_crater_rate",
  threshold: 10000,
} as const satisfies CtwAchievement
