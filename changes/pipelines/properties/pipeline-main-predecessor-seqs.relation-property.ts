import type { List } from "@akasha/pages-system/page-property"
import type { RelationProperty } from "@akasha/pages-system/relation-property"
import type { PipelineSeq } from "./pipeline-seq.text-property.ts"

export type PipelineMainPredecessorSeqs = List<PipelineSeq>

export const pipelineMainPredecessorSeqs = {
  id: "01a06950-236c-7cdf-b124-07952ed5ad2f",
  pageTypeSlug: "relation-property",
  slug: "pipeline-main-predecessor-seqs",
  propertySlug: "main-predecessor-seqs",
  definition: "the pipelines on main this one builds its answer on",
  targetPageTypeSlug: "page-type/pipeline",
} as const satisfies RelationProperty
