import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const dragonsTooth = {
  id: "019dbb6d-8322-7a14-bad4-aa8807331813",
  pageTypeSlug: "ctw-achievement",
  slug: "dragons-tooth",
  title: "Dragon’s Tooth",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 100,
} as const satisfies CtwAchievement
