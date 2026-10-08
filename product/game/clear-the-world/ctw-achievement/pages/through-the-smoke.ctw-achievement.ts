import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const throughTheSmoke = {
  id: "019dbb6d-a1cd-704d-8f46-649da7982c47",
  type: "page-type/ctw-achievement",
  slug: "through-the-smoke",
  title: "Through the Smoke",
  scope: "profile",
  metric: "cross_zone_floods",
  threshold: 5,
  description:
    "Demining teams clear in corridors, not isolated patches. A safe path through one field often reveals safe passage into the next. Corridor clearance reconnects communities that landmines have isolated for decades.",
  createdAt: "2026-04-23T17:40:17.485Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
