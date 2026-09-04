import type { CoachingConstraint } from "../../coaching-constraint.page-type.ts"

export const jointSwellingBackOffOnFlareDays = {
  id: "019f01e1-b952-783a-a931-b952d7a3a560",
  pageTypeSlug: "coaching-constraint",
  slug: "joint-swelling-back-off-on-flare-days",
  title: "Joint swelling — back off on flare days",
  coachingConstraintActive: true,
  focusTags: ["all"],
  coachingConstraintKind: "injury-watch",
  coachingConstraintSortOrder: 7,
  asks: "txt",
} as const satisfies CoachingConstraint
