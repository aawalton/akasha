import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const fastestTreaty = {
  id: "019dbb6e-3df8-75db-83a6-c598b6531840",
  type: "page-type/ctw-achievement",
  slug: "fastest-treaty",
  title: "Fastest Treaty",
  scope: "global",
  metric: "global_donation_milestone",
  threshold: 1000,
  description:
    "The Ottawa Treaty went from first proposal to binding international law in just 14 months — the fastest major multilateral treaty in history. Speed matters when lives are at stake. $1,000 contributed together, and growing.",
  createdAt: "2026-04-23T17:40:57.464Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
