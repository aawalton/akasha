import type { CtwAchievement } from "akasha/products/games/clear-the-world/ctw-achievements/ctw-achievement.page-type.types.ts"

export const mapa = {
  id: "019dbb6d-e09d-7c2a-a441-98025f7fba5e",
  type: "ctw-achievement",
  slug: "mapa",
  title: "MAPA",
  scope: "team",
  metric: "team_members_active_day",
  threshold: 5,
} as const satisfies CtwAchievement
