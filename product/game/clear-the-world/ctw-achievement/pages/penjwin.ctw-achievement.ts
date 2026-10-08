import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const penjwin = {
  id: "019dbb6d-c919-707c-b32e-85fc229bfd48",
  type: "page-type/ctw-achievement",
  slug: "penjwin",
  title: "Penjwin",
  scope: "team",
  metric: "team_cells_cleared",
  threshold: 5000000,
  description:
    "The Penjwin district along the Iraq-Iran border contains minefields laid during the 1980–1988 war. Clearance teams work in terrain ranging from river valleys to mountain passes above 2,000 metres.",
  createdAt: "2026-04-23T17:40:27.545Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
