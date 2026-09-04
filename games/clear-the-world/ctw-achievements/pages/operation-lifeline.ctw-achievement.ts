import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const operationLifeline = {
  id: "019dbb6d-aee1-75c7-9c8f-0ebb3d5a31d4",
  pageTypeSlug: "ctw-achievement",
  slug: "operation-lifeline",
  title: "Operation Lifeline",
  scope: "profile",
  metric: "cumulative_flood_fill",
  threshold: 10000,
  description:
    "Clearing 1 hectare by hand takes a team of deminers roughly two to four weeks. Early HALO teams in Afghanistan cleared corridors one hectare at a time to reopen roads for returning refugees.",
} as const satisfies CtwAchievement
