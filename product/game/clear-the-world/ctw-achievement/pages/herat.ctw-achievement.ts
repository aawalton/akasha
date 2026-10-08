import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const herat = {
  id: "019dbb6d-7b0f-734c-9d77-18fe186348e5",
  type: "page-type/ctw-achievement",
  slug: "herat",
  title: "Herat",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 10000000,
  description:
    "HALO Trust’s 10-year clearance of Herat Province, completed in 2017, freed 40 million m² of farmland and enabled a new residential district — Jebrail — housing 60,000 returning refugees.",
  createdAt: "2026-04-23T17:40:07.567Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
