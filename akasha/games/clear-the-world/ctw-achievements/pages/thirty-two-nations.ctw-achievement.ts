import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const thirtyTwoNations = {
  id: "019dbb6e-21ad-78ea-86c8-7fb58f242669",
  pageTypeSlug: "ctw-achievement",
  slug: "thirty-two-nations",
  title: "Thirty-Two Nations",
  scope: "global",
  metric: "all_continents_have_completed_zone",
  threshold: 1,
  description:
    "Thirty-two countries have completed their mine clearance obligations under the Ottawa Treaty, from Djibouti in 2002 to Oman in 2025. With a completed zone on every continent, this community has achieved its own version of global completion — a start, not a finish.",
} as const satisfies CtwAchievement
