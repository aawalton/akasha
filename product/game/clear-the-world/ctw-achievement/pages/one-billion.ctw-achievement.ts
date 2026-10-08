import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const oneBillion = {
  id: "019dbb6e-42e7-7898-8b50-9715e1e6ca69",
  type: "page-type/ctw-achievement",
  slug: "one-billion",
  title: "One Billion",
  scope: "global",
  metric: "global_donation_milestone",
  threshold: 50000,
  description:
    "In 2023, international funding for mine action exceeded $1 billion for the first time — a milestone that took decades to reach. This community’s combined contributions are a growing part of that funding ecosystem.",
  createdAt: "2026-04-23T17:40:58.727Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
