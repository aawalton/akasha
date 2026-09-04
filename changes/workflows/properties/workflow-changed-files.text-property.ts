import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkflowChangedFiles = string

export const workflowChangedFiles = {
  id: "01a06950-236c-7a79-99f0-fb8bdadb788a",
  pageTypeSlug: "text-property",
  slug: "workflow-changed-files",
  propertySlug: "changed-files",
  definition: "the changed files that pulled this workflow in",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
