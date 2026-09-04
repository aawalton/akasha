import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const hundredHorizons = {
  id: "019dbb6e-1718-786c-9068-3740ba642c30",
  pageTypeSlug: "ctw-achievement",
  slug: "hundred-horizons",
  title: "Hundred Horizons",
  scope: "global",
  metric: "global_zones_explored",
  threshold: 100,
} as const satisfies CtwAchievement
