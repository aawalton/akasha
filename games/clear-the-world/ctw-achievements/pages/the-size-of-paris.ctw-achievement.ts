import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const theSizeOfParis = {
  id: "019dbb6e-0a56-7afd-b9c3-f281ef9ec23f",
  pageTypeSlug: "ctw-achievement",
  slug: "the-size-of-paris",
  title: "The Size of Paris",
  scope: "global",
  metric: "global_cells_cleared",
  threshold: 100000000,
  description:
    "APOPO’s cumulative area cleared by December 2023 exceeded 100 million square metres — roughly the footprint of Paris. 31,739 landmines and 90,140 items of explosive remnants of war removed in the process.",
} as const satisfies CtwAchievement
