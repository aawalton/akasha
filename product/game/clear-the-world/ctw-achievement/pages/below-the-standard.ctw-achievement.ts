import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const belowTheStandard = {
  id: "019dbb6e-388c-7b2d-ad83-3aa619e0c0a2",
  type: "page-type/ctw-achievement",
  slug: "below-the-standard",
  title: "Below the Standard",
  scope: "global",
  metric: "global_crater_rate",
  threshold: 10000000000,
  description:
    "IMAS quality standards require that cleared land meets a defined completion standard before it can be handed back to communities. A global crater rate below 5% across billions of cells reflects collective care and diligence.",
  createdAt: "2026-04-23T17:40:56.076Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
