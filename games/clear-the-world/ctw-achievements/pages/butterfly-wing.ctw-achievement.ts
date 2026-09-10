import type { CtwAchievement } from "../ctw-achievement.page-type.types.ts"

export const butterflyWing = {
  id: "019dbb6d-8075-7aa9-81ee-471785c4839b",
  pageTypeSlug: "ctw-achievement",
  type: "ctw-achievement",
  slug: "butterfly-wing",
  title: "Butterfly Wing",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 1,
} as const satisfies CtwAchievement
