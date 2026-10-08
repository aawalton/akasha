import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const threeThousandEleven = {
  id: "019dbb6e-0f64-7a66-b6bf-608bb6e18f3b",
  type: "page-type/ctw-achievement",
  slug: "three-thousand-eleven",
  title: "Three Thousand Eleven",
  scope: "global",
  metric: "global_cells_cleared",
  threshold: 10000000000,
  description:
    "Since 1989, Afghanistan’s Mine Action Programme has freed over 3,011 square kilometres and cleared 18 million landmines — the longest-running humanitarian demining programme in the world.",
  createdAt: "2026-04-23T17:40:45.540Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
