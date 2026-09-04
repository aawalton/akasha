import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const sharedGround = {
  id: "019dbb6e-2e6e-783b-b3aa-ac44ae2f46e3",
  pageTypeSlug: "ctw-achievement",
  slug: "shared-ground",
  title: "Shared Ground",
  scope: "global",
  metric: "zone_multi_team_activity",
  threshold: 2,
} as const satisfies CtwAchievement
