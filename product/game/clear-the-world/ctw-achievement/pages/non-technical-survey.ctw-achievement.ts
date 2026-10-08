import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const nonTechnicalSurvey = {
  id: "019dbb6d-d619-780b-87da-7d4c4dbbafda",
  type: "page-type/ctw-achievement",
  slug: "non-technical-survey",
  title: "Non-Technical Survey",
  scope: "team",
  metric: "team_marks",
  threshold: 5000,
  description:
    "Non-technical survey gathers evidence to define suspected hazardous areas without physical intervention. Teams interview residents, review records, and mark boundaries that guide where clearance resources are deployed.",
  createdAt: "2026-04-23T17:40:30.873Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
