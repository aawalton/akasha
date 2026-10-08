import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const dragonsTooth = {
  id: "019dbb6d-8322-7a14-bad4-aa8807331813",
  type: "page-type/ctw-achievement",
  slug: "dragons-tooth",
  title: "Dragon’s Tooth",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 100,
  createdAt: "2026-04-23T17:40:09.634Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
