import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const eightyPercent = {
  id: "019dbb6e-26c2-74d9-9c74-6312d9908cd1",
  pageTypeSlug: "ctw-achievement",
  slug: "eighty-percent",
  title: "Eighty Percent",
  scope: "global",
  metric: "global_marks",
  threshold: 100000,
  description:
    "Annual landmine casualties have fallen roughly 80% from their peak of 26,000 in the late 1990s, thanks in part to systematic surveying and marking of contaminated areas. Marking saves lives before clearance even begins.",
} as const satisfies CtwAchievement
