import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const mineAwarenessDay = {
  id: "019dbb6e-4069-7eed-868a-53344fe2196b",
  type: "page-type/ctw-achievement",
  slug: "mine-awareness-day",
  title: "Mine Awareness Day",
  scope: "global",
  metric: "global_donation_milestone",
  threshold: 10000,
  description:
    "4 April is the International Day for Mine Awareness and Assistance in Mine Action, designated by the UN General Assembly in 2005. This community makes every day count, not just one.",
  createdAt: "2026-04-23T17:40:58.089Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
