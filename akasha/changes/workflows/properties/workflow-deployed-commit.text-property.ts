import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkflowDeployedCommit = string

export const workflowDeployedCommit = {
  id: "01a06950-236c-7b39-aa46-f372ffb7134e",
  pageTypeSlug: "text-property",
  slug: "workflow-deployed-commit",
  propertySlug: "deployed-commit",
  definition: "the commit this workflow last deployed",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
