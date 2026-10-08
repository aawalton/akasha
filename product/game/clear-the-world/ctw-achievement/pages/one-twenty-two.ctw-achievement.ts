import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const oneTwentyTwo = {
  id: "019dbb6e-30f3-7962-bb30-405f29744fb0",
  type: "page-type/ctw-achievement",
  slug: "one-twenty-two",
  title: "One Twenty-Two",
  scope: "global",
  metric: "all_teams_active_day",
  threshold: 6,
  description:
    "On 3 December 1997, representatives of 122 nations gathered in Ottawa to sign the Mine Ban Treaty — the fastest-negotiated multilateral disarmament agreement in history. All six teams active on the same day echoes that moment of universal commitment.",
  createdAt: "2026-04-23T17:40:54.131Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
