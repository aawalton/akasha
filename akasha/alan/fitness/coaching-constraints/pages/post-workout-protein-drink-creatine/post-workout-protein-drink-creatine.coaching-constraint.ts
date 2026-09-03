import type { CoachingConstraint } from "../../coaching-constraint.page-type.ts"

export const postWorkoutProteinDrinkCreatine = {
  id: "019f01e1-bc79-7d4c-b0c8-2814987edd4a",
  pageTypeSlug: "coaching-constraint",
  slug: "post-workout-protein-drink-creatine",
  title: "Post-workout: protein drink + creatine",
  coachingConstraintActive: true,
  focusTags: ["all"],
  coachingConstraintKind: "programming-cue",
  coachingConstraintSortOrder: 11,
  asks: "txt",
} as const satisfies CoachingConstraint
