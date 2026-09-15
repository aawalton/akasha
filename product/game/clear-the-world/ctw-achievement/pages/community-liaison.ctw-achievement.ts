import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const communityLiaison = {
  id: "019dbb6d-d392-73db-a76d-53718806fa5f",
  type: "ctw-achievement",
  slug: "community-liaison",
  title: "Community Liaison",
  scope: "team",
  metric: "team_marks",
  threshold: 500,
} as const satisfies CtwAchievement
