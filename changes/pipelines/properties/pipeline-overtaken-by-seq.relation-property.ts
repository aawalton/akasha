import type { RelationProperty } from "@akasha/pages-system/relation-property"
import type { PipelineSeq } from "./pipeline-seq.text-property.ts"

export type PipelineOvertakenBySeq = PipelineSeq

export const pipelineOvertakenBySeq = {
  id: "01a06950-236c-744f-8e29-7d3e2544c16c",
  pageTypeSlug: "relation-property",
  slug: "pipeline-overtaken-by-seq",
  propertySlug: "overtaken-by-seq",
  definition: "the pipeline that overtook this one",
  targetPageTypeSlug: "page-type/pipeline",
} as const satisfies RelationProperty
