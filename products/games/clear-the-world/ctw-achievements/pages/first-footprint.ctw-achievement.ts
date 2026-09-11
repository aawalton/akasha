import type { CtwAchievement } from "akasha/products/games/clear-the-world/ctw-achievements/ctw-achievement.page-type.types.ts"

export const firstFootprint = {
  id: "019dbb6d-9f3c-7e1b-b9f3-732d208447f8",
  type: "ctw-achievement",
  slug: "first-footprint",
  title: "First Footprint",
  scope: "profile",
  metric: "first_zone_opener",
  threshold: 1,
} as const satisfies CtwAchievement
