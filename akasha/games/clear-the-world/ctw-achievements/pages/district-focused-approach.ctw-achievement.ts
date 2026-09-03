import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const districtFocusedApproach = {
  id: "019dbb6d-db74-76b9-8b83-56b6db938b38",
  pageTypeSlug: "ctw-achievement",
  slug: "district-focused-approach",
  title: "District Focused Approach",
  scope: "team",
  metric: "team_marks",
  threshold: 100000,
  description:
    "The District Focused Approach is a strategy developed in Laos where clearance organisations concentrate resources district by district, completing full survey and marking before moving on. It replaced scattered efforts with systematic progress.",
} as const satisfies CtwAchievement
