import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const fiftyFiveMillion = {
  id: "019dbb6e-11ea-7ffe-a5c0-cfdc25758d97",
  pageTypeSlug: "ctw-achievement",
  slug: "fifty-five-million",
  title: "Fifty-Five Million",
  scope: "global",
  metric: "global_cells_cleared",
  threshold: 100000000000,
  description:
    "Since the Ottawa Treaty, 92 states parties have destroyed over 55 million stockpiled anti-personnel mines — weapons that will never reach the ground. Italy alone destroyed 7.1 million from its arsenals.",
} as const satisfies CtwAchievement
