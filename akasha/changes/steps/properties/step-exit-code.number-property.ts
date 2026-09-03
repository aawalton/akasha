import type { NumberProperty } from "@akasha/pages-system/number-property"

export type StepExitCode = number

export const stepExitCode = {
  id: "01a06950-236c-7d5d-a08c-6527777096da",
  pageTypeSlug: "number-property",
  slug: "step-exit-code",
  propertySlug: "exit-code",
  definition: "what the step's commands exited with",
  max: null,
} as const satisfies NumberProperty
