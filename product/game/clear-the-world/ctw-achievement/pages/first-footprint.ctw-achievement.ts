import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const firstFootprint = {
  id: "019dbb6d-9f3c-7e1b-b9f3-732d208447f8",
  type: "page-type/ctw-achievement",
  slug: "first-footprint",
  title: "First Footprint",
  scope: "profile",
  metric: "first_zone_opener",
  threshold: 1,
  createdAt: "2026-04-23T17:40:16.828Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
