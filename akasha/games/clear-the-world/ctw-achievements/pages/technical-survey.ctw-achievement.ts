import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const technicalSurvey = {
  id: "019dbb6d-9514-7f8d-a932-7e30a9480a7a",
  pageTypeSlug: "ctw-achievement",
  slug: "technical-survey",
  title: "Technical Survey",
  scope: "profile",
  metric: "session_numbered_cells",
  threshold: 100,
  description:
    "Technical Survey replaced guesswork with systematic evidence: deminers use metal detectors and ground-penetrating radar to map exactly where ordnance lies before any ground is broken.",
} as const satisfies CtwAchievement
