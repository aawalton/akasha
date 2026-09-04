import type { TextProperty } from "@akasha/pages-system/text-property"

export type StepLaunchRefusedReason = string

export const stepLaunchRefusedReason = {
  id: "01a06950-236c-71d6-b3de-b5aca8219e26",
  pageTypeSlug: "text-property",
  slug: "step-launch-refused-reason",
  propertySlug: "launch-refused-reason",
  definition: "why the cluster refused to launch the step's container",
  max: 2000,
  nameFormatSlug: null,
} as const satisfies TextProperty
