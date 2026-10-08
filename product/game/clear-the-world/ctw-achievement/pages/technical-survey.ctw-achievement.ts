import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const technicalSurvey = {
  id: "019dbb6d-9514-7f8d-a932-7e30a9480a7a",
  type: "page-type/ctw-achievement",
  slug: "technical-survey",
  title: "Technical Survey",
  scope: "profile",
  metric: "session_numbered_cells",
  threshold: 100,
  description:
    "Technical Survey replaced guesswork with systematic evidence: deminers use metal detectors and ground-penetrating radar to map exactly where ordnance lies before any ground is broken.",
  createdAt: "2026-04-23T17:40:14.228Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
