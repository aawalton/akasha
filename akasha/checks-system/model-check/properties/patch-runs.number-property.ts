import type { NumberProperty } from "@akasha/pages-system/number-property"

export type PatchRuns = number

export const patchRuns = {
  id: "01a05911-aa19-7246-8f53-09d48a600484",
  pageTypeSlug: "number-property",
  slug: "patch-runs",
  propertySlug: "patch-runs",
  definition: "how many times a change is judged",
  max: null,
} as const satisfies NumberProperty
