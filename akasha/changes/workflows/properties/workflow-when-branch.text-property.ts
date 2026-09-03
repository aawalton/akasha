import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkflowWhenBranch = string

export const workflowWhenBranch = {
  id: "01a06950-236c-7427-9532-a8056beedc31",
  pageTypeSlug: "text-property",
  slug: "workflow-when-branch",
  propertySlug: "when-branch",
  definition: "the branch pattern that decides whether this workflow runs",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
