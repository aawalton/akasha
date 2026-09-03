import type { TextProperty } from "@akasha/pages-system/text-property"

export type PipelineCommit = string

export const pipelineCommit = {
  id: "01a06950-236c-70c9-83cb-2eb1edefea12",
  pageTypeSlug: "text-property",
  slug: "pipeline-commit",
  propertySlug: "commit",
  definition: "the commit this pipeline ran",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
