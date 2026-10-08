import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const caqueta = {
  id: "019dbb6d-ce6a-7299-a68a-766b71f144c9",
  type: "page-type/ctw-achievement",
  slug: "caqueta",
  title: "Caquetá",
  scope: "team",
  metric: "team_cells_cleared",
  threshold: 100000000,
  description:
    "Caquetá department in southern Colombia hosts one of the world’s first humanitarian demining programmes staffed by former combatants alongside civilian teams. Since the 2016 peace agreement, the Humanicemos programme has cleared land in indigenous communities.",
  createdAt: "2026-04-23T17:40:28.906Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
