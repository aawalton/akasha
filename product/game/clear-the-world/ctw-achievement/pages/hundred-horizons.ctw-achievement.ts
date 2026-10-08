import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const hundredHorizons = {
  id: "019dbb6e-1718-786c-9068-3740ba642c30",
  type: "page-type/ctw-achievement",
  slug: "hundred-horizons",
  title: "Hundred Horizons",
  scope: "global",
  metric: "global_zones_explored",
  threshold: 100,
  createdAt: "2026-04-23T17:40:47.512Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
