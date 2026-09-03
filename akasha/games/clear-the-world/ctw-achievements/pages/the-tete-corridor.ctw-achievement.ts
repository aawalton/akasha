import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const theTeteCorridor = {
  id: "019dbb6d-b163-79d1-91f7-0ec011336e9d",
  pageTypeSlug: "ctw-achievement",
  slug: "the-tete-corridor",
  title: "The Tete Corridor",
  scope: "profile",
  metric: "cumulative_flood_fill",
  threshold: 50000,
  description:
    "The Tete Corridor in Mozambique — a 500 km strip along the Zambezi River — was one of the most heavily mined transport routes in the world. HALO and NPA cleared it section by section. Mozambique was declared mine-free in 2015.",
} as const satisfies CtwAchievement
