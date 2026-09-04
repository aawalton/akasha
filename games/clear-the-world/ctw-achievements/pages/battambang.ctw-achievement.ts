import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const battambang = {
  id: "019dbb6d-75fe-7172-b913-a6131cbbf977",
  pageTypeSlug: "ctw-achievement",
  slug: "battambang",
  title: "Battambang",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 200000,
  description:
    "Since 1979, Battambang province has recorded more landmine casualties than any other district in Cambodia. 15 of Cambodia’s 25 provinces are now mine-free — Battambang is not yet among them.",
} as const satisfies CtwAchievement
