import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const marchFirst = {
  id: "019dbb6e-3379-75aa-8761-58c2c6a2f5a8",
  pageTypeSlug: "ctw-achievement",
  slug: "march-first",
  title: "March First",
  scope: "global",
  metric: "zone_multi_team_completion",
  threshold: 3,
  description:
    "The Ottawa Treaty entered into force on 1 March 1999, just 15 months after signing — the fastest entry into force of any major multilateral treaty in history. Three or more teams completing a zone together mirrors that rapid collective action.",
} as const satisfies CtwAchievement
