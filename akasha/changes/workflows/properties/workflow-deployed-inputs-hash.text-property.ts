import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkflowDeployedInputsHash = string

export const workflowDeployedInputsHash = {
  id: "01a06950-236c-703a-975e-5f2b2e6a8fb8",
  pageTypeSlug: "text-property",
  slug: "workflow-deployed-inputs-hash",
  propertySlug: "deployed-inputs-hash",
  definition: "the inputs hash at the deploy it last made",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
