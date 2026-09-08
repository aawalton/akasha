import type { CoachingConstraint } from "../../coaching-constraint.page-type.ts"

export const airQualityIsAHardMedicalGate = {
  id: "019f01e1-b79a-7960-8157-e7ef3d0f8f89",
  pageTypeSlug: "coaching-constraint",
  slug: "air-quality-is-a-hard-medical-gate",
  title: "Air quality is a hard medical gate",
  coachingConstraintActive: true,
  focusTags: ["all"],
  coachingConstraintKind: "medical-gate",
  coachingConstraintSortOrder: 5,
  asks: "txt",
} as const satisfies CoachingConstraint
