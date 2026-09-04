import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const fastestTreaty = {
  id: "019dbb6e-3df8-75db-83a6-c598b6531840",
  pageTypeSlug: "ctw-achievement",
  slug: "fastest-treaty",
  title: "Fastest Treaty",
  scope: "global",
  metric: "global_donation_milestone",
  threshold: 1000,
  description:
    "The Ottawa Treaty went from first proposal to binding international law in just 14 months — the fastest major multilateral treaty in history. Speed matters when lives are at stake. $1,000 contributed together, and growing.",
} as const satisfies CtwAchievement
