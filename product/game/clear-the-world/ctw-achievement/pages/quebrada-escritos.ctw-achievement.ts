import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const quebradaEscritos = {
  id: "019dbb6d-d10d-7e9b-802d-ac0b3316bb95",
  type: "page-type/ctw-achievement",
  slug: "quebrada-escritos",
  title: "Quebrada Escritos",
  scope: "team",
  metric: "team_cells_cleared",
  threshold: 500000000,
  description:
    "Quebrada Escritos in Chile’s Atacama Desert was the site of the country’s last anti-personnel mines. Chile completed its Ottawa Treaty obligations in 2020, joining over 30 states that have finished clearance.",
  createdAt: "2026-04-23T17:40:29.581Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
