import type { TextProperty } from "@akasha/pages-system/text-property"

export type StepInfraFailureKind = string

export const stepInfraFailureKind = {
  id: "01a06950-236c-7533-8ae1-be0793c75182",
  pageTypeSlug: "text-property",
  slug: "step-infra-failure-kind",
  propertySlug: "infra-failure-kind",
  definition: "what kind of infrastructure fault the step's failure was charged to",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
