import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const wideAreaSurvey = {
  id: "019dbb6d-a70e-7cbd-a5ca-cfdff6e2aa11",
  pageTypeSlug: "ctw-achievement",
  slug: "wide-area-survey",
  title: "Wide Area Survey",
  scope: "profile",
  metric: "first_opener_zones",
  threshold: 25,
  description:
    "Non-Technical Survey is the process of defining the boundaries of suspected hazardous areas before physical clearance begins. Surveyors walk the perimeter, interview communities, and map what they find.",
} as const satisfies CtwAchievement
