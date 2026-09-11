import type { CtwAchievement } from "akasha/products/games/clear-the-world/ctw-achievements/ctw-achievement.page-type.types.ts"

export const communityLiaison = {
  id: "019dbb6d-d392-73db-a76d-53718806fa5f",
  pageTypeSlug: "ctw-achievement",
  type: "ctw-achievement",
  slug: "community-liaison",
  title: "Community Liaison",
  scope: "team",
  metric: "team_marks",
  threshold: 500,
} as const satisfies CtwAchievement
