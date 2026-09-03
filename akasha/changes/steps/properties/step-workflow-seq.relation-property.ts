import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type StepWorkflowSeq = Slug

export const stepWorkflowSeq = {
  id: "01a06950-236c-7328-9a33-83087663a9af",
  pageTypeSlug: "relation-property",
  slug: "step-workflow-seq",
  propertySlug: "workflow-seq",
  definition: "the workflow this step belongs to",
  targetPageTypeSlug: "page-type/workflow",
} as const satisfies RelationProperty
