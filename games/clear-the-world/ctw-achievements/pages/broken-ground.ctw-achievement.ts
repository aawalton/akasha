import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const brokenGround = {
  id: "019dbb6e-07bc-7ab2-ba0f-2349291a8434",
  pageTypeSlug: "ctw-achievement",
  slug: "broken-ground",
  title: "Broken Ground",
  scope: "global",
  metric: "global_cells_cleared",
  threshold: 1000000,
} as const satisfies CtwAchievement
