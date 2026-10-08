import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const butterflyWing = {
  id: "019dbb6d-8075-7aa9-81ee-471785c4839b",
  type: "page-type/ctw-achievement",
  slug: "butterfly-wing",
  title: "Butterfly Wing",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 1,
  createdAt: "2026-04-23T17:40:08.949Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
