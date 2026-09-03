import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const fifteenProvinces = {
  id: "019dbb6d-eac0-7816-b6d2-b9bbdb385f17",
  pageTypeSlug: "ctw-achievement",
  slug: "fifteen-provinces",
  title: "Fifteen Provinces",
  scope: "team",
  metric: "team_zone_completions",
  threshold: 150,
  description:
    "Cambodia’s mine action programme spans its northwestern provinces, where millions of mines were laid along the Thai border during the 1980s and 1990s. Systematic province-by-province coordination has been essential to progress.",
} as const satisfies CtwAchievement
