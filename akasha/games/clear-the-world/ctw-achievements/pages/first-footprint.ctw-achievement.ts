import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const firstFootprint = {
  id: "019dbb6d-9f3c-7e1b-b9f3-732d208447f8",
  pageTypeSlug: "ctw-achievement",
  slug: "first-footprint",
  title: "First Footprint",
  scope: "profile",
  metric: "first_zone_opener",
  threshold: 1,
} as const satisfies CtwAchievement
