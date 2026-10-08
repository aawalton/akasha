import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const generationalWork = {
  id: "019dbb6d-c145-7d7a-b854-6df7f6cee1ab",
  type: "page-type/ctw-achievement",
  slug: "generational-work",
  title: "Generational Work",
  scope: "profile",
  metric: "active_days",
  threshold: 100,
  description:
    "Laos has been clearing unexploded ordnance continuously since 1996. The 1964–1973 bombing campaign left approximately 80 million unexploded submunitions across one-third of the country. At current rates, full clearance remains decades away.",
  createdAt: "2026-04-23T17:40:25.541Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
