import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const mostar = {
  id: "019dbb6d-a9a6-7a00-89d2-b4bc506bc020",
  type: "page-type/ctw-achievement",
  slug: "mostar",
  title: "Mostar",
  scope: "profile",
  metric: "zone_completion_contribution_percent",
  threshold: 10,
  description:
    "Mostar, Bosnia, was one of the most mine-contaminated cities in Europe. The last confirmed mined area inside the city was cleared in 2019 — 24 years after the ceasefire. Clearing a city block at a time is how it happens.",
  createdAt: "2026-04-23T17:40:19.494Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
