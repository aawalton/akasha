import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const oneBillion = {
  id: "019dbb6e-42e7-7898-8b50-9715e1e6ca69",
  pageTypeSlug: "ctw-achievement",
  slug: "one-billion",
  title: "One Billion",
  scope: "global",
  metric: "global_donation_milestone",
  threshold: 50000,
  description:
    "In 2023, international funding for mine action exceeded $1 billion for the first time — a milestone that took decades to reach. This community’s combined contributions are a growing part of that funding ecosystem.",
} as const satisfies CtwAchievement
