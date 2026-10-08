import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const pomzGrove = {
  id: "019dbb6d-8d79-7211-9e89-15fee0fe68c1",
  type: "page-type/ctw-achievement",
  slug: "pomz-grove",
  title: "POMZ Grove",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 20000,
  description:
    'Clearance teams call dense stake-mine fields a "POMZ grove." Ukraine currently has the largest contaminated land area of any country in the world, with POMZ variants among the most commonly encountered types.',
  createdAt: "2026-04-23T17:40:12.281Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
