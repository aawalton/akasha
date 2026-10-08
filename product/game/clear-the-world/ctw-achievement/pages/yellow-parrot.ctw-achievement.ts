import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const yellowParrot = {
  id: "019dbb6d-85c7-7407-9eb3-661f84a67965",
  type: "page-type/ctw-achievement",
  slug: "yellow-parrot",
  title: "Yellow Parrot",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 500,
  description:
    "The VS-50 was manufactured in Italy and exported worldwide before the Ottawa Treaty. Italy has since banned production, but millions remain in the ground across sub-Saharan Africa.",
  createdAt: "2026-04-23T17:40:10.311Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
