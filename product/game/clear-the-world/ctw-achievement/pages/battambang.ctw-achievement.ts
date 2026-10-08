import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const battambang = {
  id: "019dbb6d-75fe-7172-b913-a6131cbbf977",
  type: "page-type/ctw-achievement",
  slug: "battambang",
  title: "Battambang",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 200000,
  description:
    "Since 1979, Battambang province has recorded more landmine casualties than any other district in Cambodia. 15 of Cambodia’s 25 provinces are now mine-free — Battambang is not yet among them.",
  createdAt: "2026-04-23T17:40:06.270Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
