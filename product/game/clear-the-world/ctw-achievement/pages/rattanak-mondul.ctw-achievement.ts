import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const rattanakMondul = {
  id: "019dbb6d-709a-7dc4-b586-b48ca1d23948",
  type: "page-type/ctw-achievement",
  slug: "rattanak-mondul",
  title: "Rattanak Mondul",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 2500,
} as const satisfies CtwAchievement
