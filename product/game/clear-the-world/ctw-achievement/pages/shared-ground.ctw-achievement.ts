import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const sharedGround = {
  id: "019dbb6e-2e6e-783b-b3aa-ac44ae2f46e3",
  type: "page-type/ctw-achievement",
  slug: "shared-ground",
  title: "Shared Ground",
  scope: "global",
  metric: "zone_multi_team_activity",
  threshold: 2,
  createdAt: "2026-04-23T17:40:53.486Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
