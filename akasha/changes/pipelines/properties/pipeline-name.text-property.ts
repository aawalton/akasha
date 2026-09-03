import type { TextProperty } from "@akasha/pages-system/text-property"

export type PipelineName = string

export const pipelineName = {
  id: "01a06950-236c-7cbd-afd5-4f2cf7a99dcd",
  pageTypeSlug: "text-property",
  slug: "pipeline-name",
  propertySlug: "name",
  definition: "the branch and the commit a pipeline is addressed by",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
