import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const ordnanceCatalogue = {
  id: "019dbb6d-9009-70af-8976-812ed1b2c671",
  pageTypeSlug: "ctw-achievement",
  slug: "ordnance-catalogue",
  title: "Ordnance Catalogue",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 75000,
  description:
    "Professional mine surveyors — the people who walk into suspected hazard areas to map contamination before clearance can begin — are among the highest-risk occupations in humanitarian work.",
} as const satisfies CtwAchievement
