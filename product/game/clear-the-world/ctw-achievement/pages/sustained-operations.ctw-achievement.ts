import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const sustainedOperations = {
  id: "019dbb6d-bea1-7eed-bc19-0ae89fe2dd96",
  type: "page-type/ctw-achievement",
  slug: "sustained-operations",
  title: "Sustained Operations",
  scope: "profile",
  metric: "active_days",
  threshold: 30,
  description:
    "Quang Tri Province has had continuous clearance operations since 1996. Project RENEW and MAG estimate full clearance will require multiple more decades. Sustained commitment — not bursts of activity — is what makes clearance work.",
  createdAt: "2026-04-23T17:40:24.865Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
