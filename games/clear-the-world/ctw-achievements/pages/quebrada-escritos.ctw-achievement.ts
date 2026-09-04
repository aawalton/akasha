import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const quebradaEscritos = {
  id: "019dbb6d-d10d-7e9b-802d-ac0b3316bb95",
  pageTypeSlug: "ctw-achievement",
  slug: "quebrada-escritos",
  title: "Quebrada Escritos",
  scope: "team",
  metric: "team_cells_cleared",
  threshold: 500000000,
  description:
    "Quebrada Escritos in Chile’s Atacama Desert was the site of the country’s last anti-personnel mines. Chile completed its Ottawa Treaty obligations in 2020, joining over 30 states that have finished clearance.",
} as const satisfies CtwAchievement
