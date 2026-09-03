import type { SelectProperty } from "@akasha/pages-system/select-property"

export const scoringMode = {
  id: "01a0657b-1ad2-72f6-afcc-11f2b0ca1797",
  pageTypeSlug: "select-property",
  slug: "scoring-mode",
  propertySlug: "scoring-mode",
  definition: "whether a set of this movement is counted in repetitions or in seconds",
  values: ["reps", "time"],
} as const satisfies SelectProperty

export type ScoringMode = (typeof scoringMode.values)[number]
