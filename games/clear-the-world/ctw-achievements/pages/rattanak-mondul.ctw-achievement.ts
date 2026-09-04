import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const rattanakMondul = {
  id: "019dbb6d-709a-7dc4-b586-b48ca1d23948",
  pageTypeSlug: "ctw-achievement",
  slug: "rattanak-mondul",
  title: "Rattanak Mondul",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 2500,
} as const satisfies CtwAchievement
