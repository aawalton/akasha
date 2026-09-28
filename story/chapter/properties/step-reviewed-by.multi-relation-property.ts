import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const stepReviewedBy = {
  id: "01a0deb0-cf67-7a1e-bb3d-6859e1f25fce",
  type: "page-type/multi-relation-property",
  slug: "step-reviewed-by",
  propertySlug: "reviewed-by",
  definition: "the story reviewers that have checked the beats and prose of a turn or a chapter",
  targetPageType: "page-type/story-reviewer",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer is named here once it finishes its check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is reviewed once, so a reviewer named here does not run on it again.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
