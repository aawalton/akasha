import type { CoachingConstraint } from "../../coaching-constraint.page-type.ts"

export const bilateralHingesAreLowBackLimited = {
  id: "019f01e1-bade-7bc2-9eca-331981f48361",
  pageTypeSlug: "coaching-constraint",
  slug: "bilateral-hinges-are-low-back-limited",
  title: "Bilateral hinges are low-back-limited",
  coachingConstraintActive: true,
  focusTags: ["legs"],
  coachingConstraintKind: "programming-cue",
  coachingConstraintSortOrder: 9,
  asks: "txt",
} as const satisfies CoachingConstraint
