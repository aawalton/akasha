import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const herat = {
  id: "019dbb6d-7b0f-734c-9d77-18fe186348e5",
  pageTypeSlug: "ctw-achievement",
  slug: "herat",
  title: "Herat",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 10000000,
  description:
    "HALO Trust’s 10-year clearance of Herat Province, completed in 2017, freed 40 million m² of farmland and enabled a new residential district — Jebrail — housing 60,000 returning refugees.",
} as const satisfies CtwAchievement
