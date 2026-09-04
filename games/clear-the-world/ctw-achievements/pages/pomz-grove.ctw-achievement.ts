import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const pomzGrove = {
  id: "019dbb6d-8d79-7211-9e89-15fee0fe68c1",
  pageTypeSlug: "ctw-achievement",
  slug: "pomz-grove",
  title: "POMZ Grove",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 20000,
  description:
    'Clearance teams call dense stake-mine fields a "POMZ grove." Ukraine currently has the largest contaminated land area of any country in the world, with POMZ variants among the most commonly encountered types.',
} as const satisfies CtwAchievement
