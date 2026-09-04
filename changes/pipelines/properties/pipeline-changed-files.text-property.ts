import type { TextProperty } from "@akasha/pages-system/text-property"

export type PipelineChangedFiles = string

export const pipelineChangedFiles = {
  id: "01a06950-236c-7560-b6f1-292d905840c3",
  pageTypeSlug: "text-property",
  slug: "pipeline-changed-files",
  propertySlug: "changed-files",
  definition: "the files its branch changed against the commit it started from",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
