import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const nationalAuthority = {
  id: "019dbb6d-e838-7c13-b275-ac282c9aa167",
  type: "page-type/ctw-achievement",
  slug: "national-authority",
  title: "National Authority",
  scope: "team",
  metric: "team_zone_completions",
  threshold: 50,
  description:
    "Under the Ottawa Treaty, each affected country establishes a National Authority to coordinate all mine action within its borders. These bodies allocate territory, accredit operators, and verify completion standards.",
  createdAt: "2026-04-23T17:40:35.512Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
