import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const generationalWork = {
  id: "019dbb6d-c145-7d7a-b854-6df7f6cee1ab",
  pageTypeSlug: "ctw-achievement",
  slug: "generational-work",
  title: "Generational Work",
  scope: "profile",
  metric: "active_days",
  threshold: 100,
  description:
    "Laos has been clearing unexploded ordnance continuously since 1996. The 1964–1973 bombing campaign left approximately 80 million unexploded submunitions across one-third of the country. At current rates, full clearance remains decades away.",
} as const satisfies CtwAchievement
