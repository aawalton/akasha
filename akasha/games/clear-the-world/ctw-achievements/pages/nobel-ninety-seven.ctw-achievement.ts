import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const nobelNinetySeven = {
  id: "019dbb6e-3603-706e-9046-a8d947745b47",
  pageTypeSlug: "ctw-achievement",
  slug: "nobel-ninety-seven",
  title: "Nobel Ninety-Seven",
  scope: "global",
  metric: "global_cross_zone_floods",
  threshold: 1000,
  description:
    "The 1997 Nobel Peace Prize was awarded jointly to the International Campaign to Ban Landmines and its coordinator Jody Williams — recognition that citizen-led campaigns can reshape international law. The ICBL coalition included MAG, Handicap International (now Humanity & Inclusion), and hundreds of other organisations.",
} as const satisfies CtwAchievement
