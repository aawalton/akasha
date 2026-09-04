import type { TextProperty } from "@akasha/pages-system/text-property"

export type PipelineTreeHash = string

export const pipelineTreeHash = {
  id: "01a06950-236c-7c42-a3b6-29b550025d50",
  pageTypeSlug: "text-property",
  slug: "pipeline-tree-hash",
  propertySlug: "tree-hash",
  definition:
    "the hash of the source tree it ran, which is what lets a later pipeline reuse its build",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
