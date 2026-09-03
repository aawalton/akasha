import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const theWalk = {
  id: "019dbb6e-3b3d-7a99-abf6-0ca2e81d6c95",
  pageTypeSlug: "ctw-achievement",
  slug: "the-walk",
  title: "The Walk",
  scope: "global",
  metric: "global_compound",
  threshold: 1,
  description:
    "On 15 January 1997, a single photograph of Diana, Princess of Wales, walking through a partially cleared minefield in Angola transformed the landmine crisis from a military footnote into a global humanitarian cause. The Ottawa Treaty was signed eleven months later. Awareness became action.",
} as const satisfies CtwAchievement
