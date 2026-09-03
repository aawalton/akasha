import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const communityLiaison = {
  id: "019dbb6d-d392-73db-a76d-53718806fa5f",
  pageTypeSlug: "ctw-achievement",
  slug: "community-liaison",
  title: "Community Liaison",
  scope: "team",
  metric: "team_marks",
  threshold: 500,
} as const satisfies CtwAchievement
