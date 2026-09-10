import type { Domain } from "../../../../../domains/domain.page-type.types.ts"

export const fitnessCoaching = {
  id: "01a08181-38f5-7959-999a-59779918cada",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "fitness-coaching",
  definition: "the limits and cues Alan's training is programmed by",
  parts: ["page-type/fitness-coaching-note"],
} as const satisfies Domain
