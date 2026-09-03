import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const qualityAssurance = {
  id: "019dbb6d-f245-7ba0-95f5-fd4a1a7c900d",
  pageTypeSlug: "ctw-achievement",
  slug: "quality-assurance",
  title: "Quality Assurance",
  scope: "team",
  metric: "team_crater_rate",
  threshold: 500000,
  description:
    "Quality assurance in mine action involves independent sampling of cleared land to verify that operators met required standards. A failed QA inspection means the entire area must be re-cleared at the operator’s expense.",
} as const satisfies CtwAchievement
