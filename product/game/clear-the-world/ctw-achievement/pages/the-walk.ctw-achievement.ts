import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const theWalk = {
  id: "019dbb6e-3b3d-7a99-abf6-0ca2e81d6c95",
  type: "page-type/ctw-achievement",
  slug: "the-walk",
  title: "The Walk",
  scope: "global",
  metric: "global_compound",
  threshold: 1,
  description:
    "On 15 January 1997, a single photograph of Diana, Princess of Wales, walking through a partially cleared minefield in Angola transformed the landmine crisis from a military footnote into a global humanitarian cause. The Ottawa Treaty was signed eleven months later. Awareness became action.",
  createdAt: "2026-04-23T17:40:56.765Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
