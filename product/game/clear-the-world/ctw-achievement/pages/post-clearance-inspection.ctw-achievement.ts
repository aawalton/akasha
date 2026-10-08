import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const postClearanceInspection = {
  id: "019dbb6d-f4d4-7320-8306-236f1d87cb01",
  type: "page-type/ctw-achievement",
  slug: "post-clearance-inspection",
  title: "Post-Clearance Inspection",
  scope: "team",
  metric: "team_marks_accuracy",
  threshold: 1000,
  description:
    "Post-clearance inspection returns to previously cleared land after a defined period to verify that no hazards were missed and that the community is using the land safely. It is the final quality check before permanent closure.",
  createdAt: "2026-04-23T17:40:38.740Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
