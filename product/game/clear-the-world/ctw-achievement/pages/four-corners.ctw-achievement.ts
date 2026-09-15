import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const fourCorners = {
  id: "019dbb6d-a452-7beb-ad6f-5234ab51d3e4",
  type: "page-type/ctw-achievement",
  slug: "four-corners",
  title: "Four Corners",
  scope: "profile",
  metric: "zones_on_continents",
  threshold: 4,
  description:
    "Landmine contamination is not a regional problem. The ICBL documents contamination in 60+ countries across every inhabited continent.",
} as const satisfies CtwAchievement
