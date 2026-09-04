import type { CoachingConstraint } from "../../coaching-constraint.page-type.ts"

export const overheadMobility50NoForcedLockout = {
  id: "019f01e1-b43d-7dad-9e6d-e637aca78499",
  pageTypeSlug: "coaching-constraint",
  slug: "overhead-mobility-50-no-forced-lockout",
  title: "Overhead mobility ~50% — no forced lockout",
  coachingConstraintActive: true,
  focusTags: ["push"],
  coachingConstraintKind: "programming-cue",
  coachingConstraintSortOrder: 1,
  asks: "txt",
} as const satisfies CoachingConstraint
