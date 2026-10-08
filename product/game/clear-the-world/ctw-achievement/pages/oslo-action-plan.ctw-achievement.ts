import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const osloActionPlan = {
  id: "019dbb6e-04cb-715f-8114-7bce40d03d75",
  type: "page-type/ctw-achievement",
  slug: "oslo-action-plan",
  title: "Oslo Action Plan",
  scope: "team",
  metric: "team_donation_milestone",
  threshold: 50000,
  description:
    "The 2019 Oslo Action Plan is the current framework for Ottawa Treaty implementation, emphasising national ownership, integration of mine action with broader development goals, and the urgency of meeting extended deadlines.",
  createdAt: "2026-04-23T17:40:42.827Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
