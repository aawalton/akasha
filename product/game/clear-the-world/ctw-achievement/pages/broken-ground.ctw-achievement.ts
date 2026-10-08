import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const brokenGround = {
  id: "019dbb6e-07bc-7ab2-ba0f-2349291a8434",
  type: "page-type/ctw-achievement",
  slug: "broken-ground",
  title: "Broken Ground",
  scope: "global",
  metric: "global_cells_cleared",
  threshold: 1000000,
  createdAt: "2026-04-23T17:40:43.580Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
