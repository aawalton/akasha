import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const theSizeOfParis = {
  id: "019dbb6e-0a56-7afd-b9c3-f281ef9ec23f",
  type: "page-type/ctw-achievement",
  slug: "the-size-of-paris",
  title: "The Size of Paris",
  scope: "global",
  metric: "global_cells_cleared",
  threshold: 100000000,
  description:
    "APOPO’s cumulative area cleared by December 2023 exceeded 100 million square metres — roughly the footprint of Paris. 31,739 landmines and 90,140 items of explosive remnants of war removed in the process.",
  createdAt: "2026-04-23T17:40:44.246Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
