import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const oneTwentyTwo = {
  id: "019dbb6e-30f3-7962-bb30-405f29744fb0",
  pageTypeSlug: "ctw-achievement",
  slug: "one-twenty-two",
  title: "One Twenty-Two",
  scope: "global",
  metric: "all_teams_active_day",
  threshold: 6,
  description:
    "On 3 December 1997, representatives of 122 nations gathered in Ottawa to sign the Mine Ban Treaty — the fastest-negotiated multilateral disarmament agreement in history. All six teams active on the same day echoes that moment of universal commitment.",
} as const satisfies CtwAchievement
