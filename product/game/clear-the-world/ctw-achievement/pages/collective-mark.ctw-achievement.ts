import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const collectiveMark = {
  id: "019dbb6e-243e-7b40-9d42-69126358d916",
  type: "page-type/ctw-achievement",
  slug: "collective-mark",
  title: "Collective Mark",
  scope: "global",
  metric: "global_marks",
  threshold: 5000,
  createdAt: "2026-04-23T17:40:50.878Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
