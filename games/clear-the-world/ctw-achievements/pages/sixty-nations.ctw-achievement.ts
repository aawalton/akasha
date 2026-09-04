import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const sixtyNations = {
  id: "019dbb6e-19b7-7bd5-a689-60717763f5fb",
  pageTypeSlug: "ctw-achievement",
  slug: "sixty-nations",
  title: "Sixty Nations",
  scope: "global",
  metric: "global_zones_explored",
  threshold: 1000,
  description:
    "Over 60 countries and territories remain contaminated by landmines and explosive remnants of war. One thousand zones means the community’s footprint spans more squares of earth than there are affected nations.",
} as const satisfies CtwAchievement
