import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const caqueta = {
  id: "019dbb6d-ce6a-7299-a68a-766b71f144c9",
  pageTypeSlug: "ctw-achievement",
  slug: "caqueta",
  title: "Caquetá",
  scope: "team",
  metric: "team_cells_cleared",
  threshold: 100000000,
  description:
    "Caquetá department in southern Colombia hosts one of the world’s first humanitarian demining programmes staffed by former combatants alongside civilian teams. Since the 2016 peace agreement, the Humanicemos programme has cleared land in indigenous communities.",
} as const satisfies CtwAchievement
