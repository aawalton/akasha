import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const maputoActionPlan = {
  id: "019dbb6d-ff8d-7fc2-8447-893cdb5151d4",
  type: "page-type/ctw-achievement",
  slug: "maputo-action-plan",
  title: "Maputo Action Plan",
  scope: "team",
  metric: "team_donation_milestone",
  threshold: 2500,
  description:
    "The 2014 Maputo Action Plan set the aspiration of completing global mine clearance by 2025. While that deadline will not be met, the plan accelerated progress: over 30 countries have completed their obligations since the Ottawa Treaty entered force.",
  createdAt: "2026-04-23T17:40:41.485Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
