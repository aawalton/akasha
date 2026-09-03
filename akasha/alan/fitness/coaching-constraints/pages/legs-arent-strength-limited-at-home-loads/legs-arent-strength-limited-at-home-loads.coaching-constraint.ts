import type { CoachingConstraint } from "../../coaching-constraint.page-type.ts"

export const legsArentStrengthLimitedAtHomeLoads = {
  id: "019f01e1-ba1c-75c3-bf47-6063b5c223f4",
  pageTypeSlug: "coaching-constraint",
  slug: "legs-arent-strength-limited-at-home-loads",
  title: "Legs aren't strength-limited at home loads",
  coachingConstraintActive: true,
  focusTags: ["legs"],
  coachingConstraintKind: "programming-cue",
  coachingConstraintSortOrder: 8,
  asks: "txt",
} as const satisfies CoachingConstraint
