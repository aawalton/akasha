import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const qualityAssurance = {
  id: "019dbb6d-f245-7ba0-95f5-fd4a1a7c900d",
  type: "page-type/ctw-achievement",
  slug: "quality-assurance",
  title: "Quality Assurance",
  scope: "team",
  metric: "team_crater_rate",
  threshold: 500000,
  description:
    "Quality assurance in mine action involves independent sampling of cleared land to verify that operators met required standards. A failed QA inspection means the entire area must be re-cleared at the operator’s expense.",
  createdAt: "2026-04-23T17:40:38.085Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
