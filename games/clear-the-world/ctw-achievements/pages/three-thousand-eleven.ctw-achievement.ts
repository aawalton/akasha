import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const threeThousandEleven = {
  id: "019dbb6e-0f64-7a66-b6bf-608bb6e18f3b",
  pageTypeSlug: "ctw-achievement",
  slug: "three-thousand-eleven",
  title: "Three Thousand Eleven",
  scope: "global",
  metric: "global_cells_cleared",
  threshold: 10000000000,
  description:
    "Since 1989, Afghanistan’s Mine Action Programme has freed over 3,011 square kilometres and cleared 18 million landmines — the longest-running humanitarian demining programme in the world.",
} as const satisfies CtwAchievement
