import type { CtwAchievement } from "akasha/products/games/clear-the-world/ctw-achievements/ctw-achievement.page-type.types.ts"

export const cuanzaSul = {
  id: "019dbb6d-ac52-7305-a1d2-6ea14cbb2af0",
  type: "ctw-achievement",
  slug: "cuanza-sul",
  title: "Cuanza Sul",
  scope: "profile",
  metric: "single_flood_fill",
  threshold: 100,
} as const satisfies CtwAchievement
