import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const cahoraBassa = {
  id: "019dbb6d-cba4-78c1-8390-71a6ebd5fc8f",
  pageTypeSlug: "ctw-achievement",
  slug: "cahora-bassa",
  title: "Cahora Bassa",
  scope: "team",
  metric: "team_cells_cleared",
  threshold: 25000000,
  description:
    "The Cahora Bassa dam area in Mozambique was mined during the civil war to protect infrastructure. Clearance enabled safe access to farmland and the reservoir that supplies hydroelectric power across southern Africa.",
} as const satisfies CtwAchievement
