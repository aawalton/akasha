import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkflowInputsHash = string

export const workflowInputsHash = {
  id: "01a06950-236c-7e82-8764-7cb8d3c4b1f1",
  pageTypeSlug: "text-property",
  slug: "workflow-inputs-hash",
  propertySlug: "inputs-hash",
  definition: "the hash of everything this workflow's result depends on",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
