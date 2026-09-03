import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const postClearanceInspection = {
  id: "019dbb6d-f4d4-7320-8306-236f1d87cb01",
  pageTypeSlug: "ctw-achievement",
  slug: "post-clearance-inspection",
  title: "Post-Clearance Inspection",
  scope: "team",
  metric: "team_marks_accuracy",
  threshold: 1000,
  description:
    "Post-clearance inspection returns to previously cleared land after a defined period to verify that no hazards were missed and that the community is using the land safely. It is the final quality check before permanent closure.",
} as const satisfies CtwAchievement
