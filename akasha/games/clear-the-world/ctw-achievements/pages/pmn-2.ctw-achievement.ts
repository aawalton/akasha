import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const pmn2 = {
  id: "019dbb6d-884f-7a55-9d53-8d092e2d0eec",
  pageTypeSlug: "ctw-achievement",
  slug: "pmn-2",
  title: "PMN-2",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 2000,
  description:
    "The PMN-2 is found across Afghanistan, Cambodia, Angola, and Western Sahara. A pressure-activated blast mine, it typically causes traumatic amputation below the knee. Over 10 million remain uncleared worldwide.",
} as const satisfies CtwAchievement
