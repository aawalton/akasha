import type { CtwAchievement } from "akasha/products/games/clear-the-world/ctw-achievements/ctw-achievement.page-type.types.ts"

export const sustainedOperations = {
  id: "019dbb6d-bea1-7eed-bc19-0ae89fe2dd96",
  type: "ctw-achievement",
  slug: "sustained-operations",
  title: "Sustained Operations",
  scope: "profile",
  metric: "active_days",
  threshold: 30,
  description:
    "Quang Tri Province has had continuous clearance operations since 1996. Project RENEW and MAG estimate full clearance will require multiple more decades. Sustained commitment — not bursts of activity — is what makes clearance work.",
} as const satisfies CtwAchievement
