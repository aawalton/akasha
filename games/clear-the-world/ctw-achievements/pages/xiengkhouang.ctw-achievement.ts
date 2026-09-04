import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const xiengkhouang = {
  id: "019dbb6d-c672-70c3-b9a9-403c189de084",
  pageTypeSlug: "ctw-achievement",
  slug: "xiengkhouang",
  title: "Xiengkhouang",
  scope: "team",
  metric: "team_cells_cleared",
  threshold: 1000000,
  description:
    "Xiengkhouang province in Laos received more ordnance per capita than anywhere in history. Over 270 million cluster submunitions were dropped between 1964 and 1973 — roughly 30% failed to detonate and remain a daily hazard.",
} as const satisfies CtwAchievement
