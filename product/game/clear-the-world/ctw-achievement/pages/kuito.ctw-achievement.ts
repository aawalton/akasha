import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const kuito = {
  id: "019dbb6d-733b-7bbc-9864-86810bb30d3e",
  type: "page-type/ctw-achievement",
  slug: "kuito",
  title: "Kuito",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 50000,
  description:
    "Angola’s civil war ended in 2002 after 27 years. HALO Trust began clearing minefields near Kuito in the 1990s, lost funding, and only returned in 2019. Clearance is not a one-time event — it requires sustained commitment.",
  createdAt: "2026-04-23T17:40:05.563Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
