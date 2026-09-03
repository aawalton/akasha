import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const fourCorners = {
  id: "019dbb6d-a452-7beb-ad6f-5234ab51d3e4",
  pageTypeSlug: "ctw-achievement",
  slug: "four-corners",
  title: "Four Corners",
  scope: "profile",
  metric: "zones_on_continents",
  threshold: 4,
  description:
    "Landmine contamination is not a regional problem. The ICBL documents contamination in 60+ countries across every inhabited continent.",
} as const satisfies CtwAchievement
