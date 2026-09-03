import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type WorkflowPipelineSeq = Slug

export const workflowPipelineSeq = {
  id: "01a06950-236c-70c3-9345-a7209e22155a",
  pageTypeSlug: "relation-property",
  slug: "workflow-pipeline-seq",
  propertySlug: "pipeline-seq",
  definition: "the pipeline this workflow runs in",
  targetPageTypeSlug: "page-type/pipeline",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pipeline a workflow names may be gone by the time the workflow is read.",
    },
  ],
} as const satisfies RelationProperty
