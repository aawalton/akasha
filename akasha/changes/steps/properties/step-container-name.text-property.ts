import type { TextProperty } from "@akasha/pages-system/text-property"

export type StepContainerName = string

export const stepContainerName = {
  id: "01a06950-236b-70be-90ce-f566a215df0d",
  pageTypeSlug: "text-property",
  slug: "step-container-name",
  propertySlug: "container-name",
  definition: "the name of the container the step was launched in",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
