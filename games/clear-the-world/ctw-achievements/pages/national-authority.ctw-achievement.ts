import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const nationalAuthority = {
  id: "019dbb6d-e838-7c13-b275-ac282c9aa167",
  pageTypeSlug: "ctw-achievement",
  slug: "national-authority",
  title: "National Authority",
  scope: "team",
  metric: "team_zone_completions",
  threshold: 50,
  description:
    "Under the Ottawa Treaty, each affected country establishes a National Authority to coordinate all mine action within its borders. These bodies allocate territory, accredit operators, and verify completion standards.",
} as const satisfies CtwAchievement
