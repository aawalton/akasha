import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const landRelease = {
  id: "019dbb6d-97a4-725d-85d9-21c13cc2dac7",
  type: "page-type/ctw-achievement",
  slug: "land-release",
  title: "Land Release",
  scope: "profile",
  metric: "session_flood_fill_zero_craters",
  threshold: 100,
  description:
    "“Land Release” is the formal IMAS term for the moment cleared land is handed back to the community — certified safe, mapped, and documented. A released hectare can be farmed, built on, and walked across freely for the first time in a generation.",
  createdAt: "2026-04-23T17:40:14.884Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
