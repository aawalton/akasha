import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const completionStandard = {
  id: "019dbb6d-efbe-7fb7-bb82-ef89f8836145",
  type: "page-type/ctw-achievement",
  slug: "completion-standard",
  title: "Completion Standard",
  scope: "team",
  metric: "team_crater_rate",
  threshold: 50000,
  createdAt: "2026-04-23T17:40:37.438Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
