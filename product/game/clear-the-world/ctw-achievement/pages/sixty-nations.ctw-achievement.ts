import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const sixtyNations = {
  id: "019dbb6e-19b7-7bd5-a689-60717763f5fb",
  type: "page-type/ctw-achievement",
  slug: "sixty-nations",
  title: "Sixty Nations",
  scope: "global",
  metric: "global_zones_explored",
  threshold: 1000,
  description:
    "Over 60 countries and territories remain contaminated by landmines and explosive remnants of war. One thousand zones means the community’s footprint spans more squares of earth than there are affected nations.",
  createdAt: "2026-04-23T17:40:48.183Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
