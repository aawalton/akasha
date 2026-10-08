import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const ordnanceCatalogue = {
  id: "019dbb6d-9009-70af-8976-812ed1b2c671",
  type: "page-type/ctw-achievement",
  slug: "ordnance-catalogue",
  title: "Ordnance Catalogue",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 75000,
  description:
    "Professional mine surveyors — the people who walk into suspected hazard areas to map contamination before clearance can begin — are among the highest-risk occupations in humanitarian work.",
  createdAt: "2026-04-23T17:40:12.937Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
