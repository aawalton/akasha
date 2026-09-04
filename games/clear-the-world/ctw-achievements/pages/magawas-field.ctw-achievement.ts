import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const magawasField = {
  id: "019dbb6d-b415-7d2c-bd70-4e4b1c25434d",
  pageTypeSlug: "ctw-achievement",
  slug: "magawas-field",
  title: "Magawa’s Field",
  scope: "profile",
  metric: "cumulative_flood_fill",
  threshold: 250000,
  description:
    "APOPO’s HeroRAT Magawa screened over 141,000 m² and found 71 mines in his working career. Your cumulative flood-fill clearance now exceeds Magawa’s lifetime output. Real clearance at this scale requires years and millions of dollars.",
} as const satisfies CtwAchievement
