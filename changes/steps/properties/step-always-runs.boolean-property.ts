import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type StepAlwaysRuns = boolean

export const stepAlwaysRuns = {
  id: "01a06950-236b-7ca0-997e-7a2f360db930",
  pageTypeSlug: "boolean-property",
  slug: "step-always-runs",
  propertySlug: "always-runs",
  definition: "whether the step runs whatever the branch changed",
} as const satisfies BooleanProperty
