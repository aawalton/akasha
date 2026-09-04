import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const bihac = {
  id: "019dbb6d-7887-71c8-90f9-729286fb8022",
  pageTypeSlug: "ctw-achievement",
  slug: "bihac",
  title: "Bihać",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 1000000,
  description:
    "More than 820 km² of Bosnia and Herzegovina remain contaminated with landmines — over 30 years after the war ended. The country has cleared more than 3,000 km² since 1996, but the remaining areas are the most technically difficult.",
} as const satisfies CtwAchievement
