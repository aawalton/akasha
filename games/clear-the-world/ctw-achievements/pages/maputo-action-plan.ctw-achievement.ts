import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const maputoActionPlan = {
  id: "019dbb6d-ff8d-7fc2-8447-893cdb5151d4",
  pageTypeSlug: "ctw-achievement",
  slug: "maputo-action-plan",
  title: "Maputo Action Plan",
  scope: "team",
  metric: "team_donation_milestone",
  threshold: 2500,
  description:
    "The 2014 Maputo Action Plan set the aspiration of completing global mine clearance by 2025. While that deadline will not be met, the plan accelerated progress: over 30 countries have completed their obligations since the Ottawa Treaty entered force.",
} as const satisfies CtwAchievement
