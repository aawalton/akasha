import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const completionStandard = {
  id: "019dbb6d-efbe-7fb7-bb82-ef89f8836145",
  pageTypeSlug: "ctw-achievement",
  slug: "completion-standard",
  title: "Completion Standard",
  scope: "team",
  metric: "team_crater_rate",
  threshold: 50000,
} as const satisfies CtwAchievement
