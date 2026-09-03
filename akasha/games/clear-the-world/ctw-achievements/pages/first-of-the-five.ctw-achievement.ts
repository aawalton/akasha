import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const firstOfTheFive = {
  id: "019dbb6e-1c51-7ad5-be87-3833c606f894",
  pageTypeSlug: "ctw-achievement",
  slug: "first-of-the-five",
  title: "First of the Five",
  scope: "global",
  metric: "global_continents_active",
  threshold: 3,
  description:
    "In 2015, Mozambique became the first of the five most heavily mine-affected countries to declare itself mine-free under the Ottawa Treaty — proof that national completion is possible after decades of sustained effort.",
} as const satisfies CtwAchievement
