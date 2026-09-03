import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const returningVolunteer = {
  id: "019dbb6d-b969-73ea-8f49-0c2c1736a3cf",
  pageTypeSlug: "ctw-achievement",
  slug: "returning-volunteer",
  title: "Returning Volunteer",
  scope: "profile",
  metric: "active_days",
  threshold: 7,
} as const satisfies CtwAchievement
