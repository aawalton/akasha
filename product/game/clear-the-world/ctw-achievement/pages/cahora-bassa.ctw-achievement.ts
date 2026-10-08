import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const cahoraBassa = {
  id: "019dbb6d-cba4-78c1-8390-71a6ebd5fc8f",
  type: "page-type/ctw-achievement",
  slug: "cahora-bassa",
  title: "Cahora Bassa",
  scope: "team",
  metric: "team_cells_cleared",
  threshold: 25000000,
  description:
    "The Cahora Bassa dam area in Mozambique was mined during the civil war to protect infrastructure. Clearance enabled safe access to farmland and the reservoir that supplies hydroelectric power across southern Africa.",
  createdAt: "2026-04-23T17:40:28.196Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
