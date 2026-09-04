import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const fivePillars = {
  id: "019dbb6d-de12-7770-bce0-12c7964a46ee",
  pageTypeSlug: "ctw-achievement",
  slug: "five-pillars",
  title: "Five Pillars",
  scope: "team",
  metric: "team_marks",
  threshold: 500000,
  description:
    "The Five Pillars of Mine Action defined by the UN are clearance, mine risk education, victim assistance, stockpile destruction, and advocacy. Marking and survey underpin all five by establishing where the problem exists.",
} as const satisfies CtwAchievement
