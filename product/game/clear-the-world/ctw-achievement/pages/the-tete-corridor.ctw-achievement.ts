import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const theTeteCorridor = {
  id: "019dbb6d-b163-79d1-91f7-0ec011336e9d",
  type: "page-type/ctw-achievement",
  slug: "the-tete-corridor",
  title: "The Tete Corridor",
  scope: "profile",
  metric: "cumulative_flood_fill",
  threshold: 50000,
  description:
    "The Tete Corridor in Mozambique — a 500 km strip along the Zambezi River — was one of the most heavily mined transport routes in the world. HALO and NPA cleared it section by section. Mozambique was declared mine-free in 2015.",
  createdAt: "2026-04-23T17:40:21.475Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
