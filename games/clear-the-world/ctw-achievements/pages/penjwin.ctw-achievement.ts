import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const penjwin = {
  id: "019dbb6d-c919-707c-b32e-85fc229bfd48",
  pageTypeSlug: "ctw-achievement",
  slug: "penjwin",
  title: "Penjwin",
  scope: "team",
  metric: "team_cells_cleared",
  threshold: 5000000,
  description:
    "The Penjwin district along the Iraq-Iran border contains minefields laid during the 1980–1988 war. Clearance teams work in terrain ranging from river valleys to mountain passes above 2,000 metres.",
} as const satisfies CtwAchievement
