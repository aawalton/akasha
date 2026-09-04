import type { TextProperty } from "@akasha/pages-system/text-property"

export type PipelineOnlyCheckNames = string

export const pipelineOnlyCheckNames = {
  id: "01a06950-236c-7859-8d0a-7d446e7a8c5c",
  pageTypeSlug: "text-property",
  slug: "pipeline-only-check-names",
  propertySlug: "only-check-names",
  definition: "the checks this run was narrowed to, where it ran some of them rather than all",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
