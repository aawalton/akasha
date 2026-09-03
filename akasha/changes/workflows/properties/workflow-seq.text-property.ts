import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkflowSeq = string

export const workflowSeq = {
  id: "01a06950-236c-7caf-9354-534bb5cdce8e",
  pageTypeSlug: "text-property",
  slug: "workflow-seq",
  propertySlug: "seq",
  definition: "the number a workflow is known by within its page type",
  max: 20,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "gap",
      statement: "The counter minting a workflow's number has no akasha home yet.",
    },
  ],
} as const satisfies TextProperty
