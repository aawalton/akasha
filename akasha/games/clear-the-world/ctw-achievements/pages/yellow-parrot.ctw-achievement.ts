import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const yellowParrot = {
  id: "019dbb6d-85c7-7407-9eb3-661f84a67965",
  pageTypeSlug: "ctw-achievement",
  slug: "yellow-parrot",
  title: "Yellow Parrot",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 500,
  description:
    "The VS-50 was manufactured in Italy and exported worldwide before the Ottawa Treaty. Italy has since banned production, but millions remain in the ground across sub-Saharan Africa.",
} as const satisfies CtwAchievement
