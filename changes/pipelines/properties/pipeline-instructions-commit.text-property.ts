import type { TextProperty } from "@akasha/pages-system/text-property"

export type PipelineInstructionsCommit = string

export const pipelineInstructionsCommit = {
  id: "01a06950-236c-7655-b34c-3a711cfae9b2",
  pageTypeSlug: "text-property",
  slug: "pipeline-instructions-commit",
  propertySlug: "instructions-commit",
  definition: "the instructions repository commit its steps read",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
