import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const belowTheStandard = {
  id: "019dbb6e-388c-7b2d-ad83-3aa619e0c0a2",
  pageTypeSlug: "ctw-achievement",
  slug: "below-the-standard",
  title: "Below the Standard",
  scope: "global",
  metric: "global_crater_rate",
  threshold: 10000000000,
  description:
    "IMAS quality standards require that cleared land meets a defined completion standard before it can be handed back to communities. A global crater rate below 5% across billions of cells reflects collective care and diligence.",
} as const satisfies CtwAchievement
