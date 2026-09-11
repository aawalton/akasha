import type { CtwAchievement } from "akasha/products/games/clear-the-world/ctw-achievements/ctw-achievement.page-type.types.ts"

export const brokenGround = {
  id: "019dbb6e-07bc-7ab2-ba0f-2349291a8434",
  type: "ctw-achievement",
  slug: "broken-ground",
  title: "Broken Ground",
  scope: "global",
  metric: "global_cells_cleared",
  threshold: 1000000,
} as const satisfies CtwAchievement
