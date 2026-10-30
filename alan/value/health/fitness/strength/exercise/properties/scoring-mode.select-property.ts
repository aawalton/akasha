import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const scoringMode = {
  id: "01a0657e-2bc0-7aa5-9e66-12b33002585d",
  type: "page-type/select-property",
  slug: "scoring-mode",
  propertySlug: "scoring-mode",
  definition:
    "whether an exercise set of a strength exercise is counted in repetitions or in seconds",
  values: ["reps", "time"],
  types: "ts",
  createdAt: "2026-09-03T04:19:22.688Z",
  updatedAt: "2026-10-30T17:04:34.799Z",
} as const satisfies SelectProperty
