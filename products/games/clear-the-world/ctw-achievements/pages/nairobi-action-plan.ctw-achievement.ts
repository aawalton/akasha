import type { CtwAchievement } from "akasha/products/games/clear-the-world/ctw-achievements/ctw-achievement.page-type.types.ts"

export const nairobiActionPlan = {
  id: "019dbb6d-fce1-7a02-8bf0-0c30b78e6431",
  type: "ctw-achievement",
  slug: "nairobi-action-plan",
  title: "Nairobi Action Plan",
  scope: "team",
  metric: "team_donation_milestone",
  threshold: 500,
  description:
    "The 2004 Nairobi Action Plan was the first detailed framework for implementing Ottawa Treaty obligations. It established that clearance is not just a technical exercise but a humanitarian imperative with deadlines and accountability.",
} as const satisfies CtwAchievement
