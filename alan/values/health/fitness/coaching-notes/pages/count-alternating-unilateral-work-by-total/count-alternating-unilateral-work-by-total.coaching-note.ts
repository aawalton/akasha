import type { CoachingNote } from "../../coaching-note.page-type.ts"

export const countAlternatingUnilateralWorkByTotal = {
  id: "019f01e1-b6f3-7191-aeae-18da9502b03a",
  pageTypeSlug: "coaching-note",
  slug: "count-alternating-unilateral-work-by-total",
  title: "Count alternating/unilateral work by TOTAL",
  coachingConstraintActive: true,
  focusTags: ["all"],
  coachingConstraintKind: "ef-accommodation",
  coachingConstraintSortOrder: 4,
  asks: "txt",
} as const satisfies CoachingNote
