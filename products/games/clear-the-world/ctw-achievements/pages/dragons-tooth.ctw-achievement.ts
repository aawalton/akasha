import type { CtwAchievement } from "akasha/products/games/clear-the-world/ctw-achievements/ctw-achievement.page-type.types.ts"

export const dragonsTooth = {
  id: "019dbb6d-8322-7a14-bad4-aa8807331813",
  type: "ctw-achievement",
  slug: "dragons-tooth",
  title: "Dragon’s Tooth",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 100,
} as const satisfies CtwAchievement
