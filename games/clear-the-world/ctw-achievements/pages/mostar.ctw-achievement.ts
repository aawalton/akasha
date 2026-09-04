import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const mostar = {
  id: "019dbb6d-a9a6-7a00-89d2-b4bc506bc020",
  pageTypeSlug: "ctw-achievement",
  slug: "mostar",
  title: "Mostar",
  scope: "profile",
  metric: "zone_completion_contribution_percent",
  threshold: 10,
  description:
    "Mostar, Bosnia, was one of the most mine-contaminated cities in Europe. The last confirmed mined area inside the city was cleared in 2019 — 24 years after the ceasefire. Clearing a city block at a time is how it happens.",
} as const satisfies CtwAchievement
