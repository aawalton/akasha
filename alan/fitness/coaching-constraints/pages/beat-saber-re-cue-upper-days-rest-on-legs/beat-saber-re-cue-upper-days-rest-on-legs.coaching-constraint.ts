import type { CoachingConstraint } from "../../coaching-constraint.page-type.ts"

export const beatSaberReCueUpperDaysRestOnLegs = {
  id: "019f01e1-bd3c-7418-aff5-89f5f5ad3000",
  pageTypeSlug: "coaching-constraint",
  slug: "beat-saber-re-cue-upper-days-rest-on-legs",
  title: "Beat Saber re-cue (upper days; rest on legs)",
  coachingConstraintActive: true,
  focusTags: ["push", "pull", "upper", "legs"],
  coachingConstraintKind: "programming-cue",
  coachingConstraintSortOrder: 12,
  asks: "txt",
} as const satisfies CoachingConstraint
