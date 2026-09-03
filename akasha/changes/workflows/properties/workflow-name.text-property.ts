import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkflowName = string

export const workflowName = {
  id: "01a06950-236c-7132-87fc-7c9b60002d33",
  pageTypeSlug: "text-property",
  slug: "workflow-name",
  propertySlug: "name",
  definition: "the sequence number a workflow is addressed by",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "gap",
      statement: "The expression working this name out from a workflow's number has no home here.",
    },
  ],
} as const satisfies TextProperty
