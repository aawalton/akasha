import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const throughTheSmoke = {
  id: "019dbb6d-a1cd-704d-8f46-649da7982c47",
  pageTypeSlug: "ctw-achievement",
  slug: "through-the-smoke",
  title: "Through the Smoke",
  scope: "profile",
  metric: "cross_zone_floods",
  threshold: 5,
  description:
    "Demining teams clear in corridors, not isolated patches. A safe path through one field often reveals safe passage into the next. Corridor clearance reconnects communities that landmines have isolated for decades.",
} as const satisfies CtwAchievement
