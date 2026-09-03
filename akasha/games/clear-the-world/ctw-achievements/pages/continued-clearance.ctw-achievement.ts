import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const continuedClearance = {
  id: "019dbb6d-bbfe-7117-8927-a08c32d1f81c",
  pageTypeSlug: "ctw-achievement",
  slug: "continued-clearance",
  title: "Continued Clearance",
  scope: "profile",
  metric: "post_crater_recovery",
  threshold: 500,
  description:
    "When a deminer encounters a mine, operations do not stop — the team cordons the area, records the find, and clearance resumes. Stopping after a find would leave the land in the same state as before the program began.",
} as const satisfies CtwAchievement
