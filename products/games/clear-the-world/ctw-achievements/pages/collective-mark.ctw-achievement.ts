import type { CtwAchievement } from "akasha/products/games/clear-the-world/ctw-achievements/ctw-achievement.page-type.types.ts"

export const collectiveMark = {
  id: "019dbb6e-243e-7b40-9d42-69126358d916",
  type: "ctw-achievement",
  slug: "collective-mark",
  title: "Collective Mark",
  scope: "global",
  metric: "global_marks",
  threshold: 5000,
} as const satisfies CtwAchievement
