import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const eightyPercent = {
  id: "019dbb6e-26c2-74d9-9c74-6312d9908cd1",
  type: "page-type/ctw-achievement",
  slug: "eighty-percent",
  title: "Eighty Percent",
  scope: "global",
  metric: "global_marks",
  threshold: 100000,
  description:
    "Annual landmine casualties have fallen roughly 80% from their peak of 26,000 in the late 1990s, thanks in part to systematic surveying and marking of contaminated areas. Marking saves lives before clearance even begins.",
  createdAt: "2026-04-23T17:40:51.522Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
