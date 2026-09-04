import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const mapa = {
  id: "019dbb6d-e09d-7c2a-a441-98025f7fba5e",
  pageTypeSlug: "ctw-achievement",
  slug: "mapa",
  title: "MAPA",
  scope: "team",
  metric: "team_members_active_day",
  threshold: 5,
} as const satisfies CtwAchievement
