import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const osloActionPlan = {
  id: "019dbb6e-04cb-715f-8114-7bce40d03d75",
  pageTypeSlug: "ctw-achievement",
  slug: "oslo-action-plan",
  title: "Oslo Action Plan",
  scope: "team",
  metric: "team_donation_milestone",
  threshold: 50000,
  description:
    "The 2019 Oslo Action Plan is the current framework for Ottawa Treaty implementation, emphasising national ownership, integration of mine action with broader development goals, and the urgency of meeting extended deadlines.",
} as const satisfies CtwAchievement
