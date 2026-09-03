import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const nonTechnicalSurvey = {
  id: "019dbb6d-d619-780b-87da-7d4c4dbbafda",
  pageTypeSlug: "ctw-achievement",
  slug: "non-technical-survey",
  title: "Non-Technical Survey",
  scope: "team",
  metric: "team_marks",
  threshold: 5000,
  description:
    "Non-technical survey gathers evidence to define suspected hazardous areas without physical intervention. Teams interview residents, review records, and mark boundaries that guide where clearance resources are deployed.",
} as const satisfies CtwAchievement
