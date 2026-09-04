import type { TextProperty } from "@akasha/pages-system/text-property"

export type PipelineSeq = string

export const pipelineSeq = {
  id: "01a06950-236c-71d6-a0ef-e900c3be2c33",
  pageTypeSlug: "text-property",
  slug: "pipeline-seq",
  propertySlug: "seq",
  definition: "the number a pipeline is known by within its page type",
  max: 20,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "gap",
      statement: "The counter that mints a pipeline's seq has no akasha home yet.",
    },
  ],
} as const satisfies TextProperty
