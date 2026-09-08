import type { CoachingConstraint } from "../../coaching-constraint.page-type.ts"

export const horizontalPressingIsElbowSafe = {
  id: "019f01e1-b56f-78a5-af0d-71d5ce0a888f",
  pageTypeSlug: "coaching-constraint",
  slug: "horizontal-pressing-is-elbow-safe",
  title: "Horizontal pressing is elbow-safe",
  coachingConstraintActive: true,
  focusTags: ["push"],
  coachingConstraintKind: "programming-cue",
  coachingConstraintSortOrder: 2,
  asks: "txt",
} as const satisfies CoachingConstraint
