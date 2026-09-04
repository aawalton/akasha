import type { TextProperty } from "@akasha/pages-system/text-property"

export type PipelineNode = string

export const pipelineNode = {
  id: "01a06950-236c-762b-bbe1-a68e3b989388",
  pageTypeSlug: "text-property",
  slug: "pipeline-node",
  propertySlug: "node",
  definition: "the machine its steps were placed on",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
