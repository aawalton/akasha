import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const rattanakMondul = {
  id: "019dbb6d-709a-7dc4-b586-b48ca1d23948",
  type: "page-type/ctw-achievement",
  slug: "rattanak-mondul",
  title: "Rattanak Mondul",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 2500,
  createdAt: "2026-04-23T17:40:04.890Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
