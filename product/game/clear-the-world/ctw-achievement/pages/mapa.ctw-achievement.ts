import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const mapa = {
  id: "019dbb6d-e09d-7c2a-a441-98025f7fba5e",
  type: "page-type/ctw-achievement",
  slug: "mapa",
  title: "MAPA",
  scope: "team",
  metric: "team_members_active_day",
  threshold: 5,
  createdAt: "2026-04-23T17:40:33.565Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
