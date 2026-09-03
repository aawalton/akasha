import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const mineActionCannotWait = {
  id: "019dbb6e-2bd9-75c4-9abc-d32e77df6c46",
  pageTypeSlug: "ctw-achievement",
  slug: "mine-action-cannot-wait",
  title: "Mine Action Cannot Wait",
  scope: "global",
  metric: "global_marks",
  threshold: 10000000,
  description:
    "“Mine Action Cannot Wait” was UNMAS’s 2023 campaign message, emphasising that every day of delay means more casualties in affected communities. Ten million hazards identified collectively — this community understands urgency.",
} as const satisfies CtwAchievement
