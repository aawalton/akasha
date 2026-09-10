import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const scoringMode = {
  id: "01a0657e-2bc0-7aa5-9e66-12b33002585d",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "scoring-mode",
  propertySlug: "scoring-mode",
  definition: "whether a set of this movement is counted in repetitions or in seconds",
  values: ["reps", "time"],
} as const satisfies SelectProperty

export type ScoringMode = (typeof scoringMode.values)[number]
