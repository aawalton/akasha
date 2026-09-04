import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const mineAwarenessDay = {
  id: "019dbb6e-4069-7eed-868a-53344fe2196b",
  pageTypeSlug: "ctw-achievement",
  slug: "mine-awareness-day",
  title: "Mine Awareness Day",
  scope: "global",
  metric: "global_donation_milestone",
  threshold: 10000,
  description:
    "4 April is the International Day for Mine Awareness and Assistance in Mine Action, designated by the UN General Assembly in 2005. This community makes every day count, not just one.",
} as const satisfies CtwAchievement
