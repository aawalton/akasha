import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const kuito = {
  id: "019dbb6d-733b-7bbc-9864-86810bb30d3e",
  pageTypeSlug: "ctw-achievement",
  slug: "kuito",
  title: "Kuito",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 50000,
  description:
    "Angola’s civil war ended in 2002 after 27 years. HALO Trust began clearing minefields near Kuito in the 1990s, lost funding, and only returned in 2019. Clearance is not a one-time event — it requires sustained commitment.",
} as const satisfies CtwAchievement
