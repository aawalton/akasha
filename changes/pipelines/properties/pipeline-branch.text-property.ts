import type { TextProperty } from "@akasha/pages-system/text-property"

export type PipelineBranch = string

export const pipelineBranch = {
  id: "01a06950-236c-7a6e-a769-5d38016c298b",
  pageTypeSlug: "text-property",
  slug: "pipeline-branch",
  propertySlug: "branch",
  definition: "the branch this pipeline ran against",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
