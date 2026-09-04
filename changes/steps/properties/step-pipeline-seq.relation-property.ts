import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type StepPipelineSeq = Slug

export const stepPipelineSeq = {
  id: "01a06950-236c-7a91-ac4e-767826798bf7",
  pageTypeSlug: "relation-property",
  slug: "step-pipeline-seq",
  propertySlug: "pipeline-seq",
  definition: "the pipeline this step runs in",
  targetPageTypeSlug: "page-type/pipeline",
} as const satisfies RelationProperty
