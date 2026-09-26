import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const turnReviewedBy = {
  id: "01a0deb0-cf67-7a1e-bb3d-6859e1f25fce",
  type: "page-type/multi-relation-property",
  slug: "turn-reviewed-by",
  propertySlug: "reviewed-by",
  definition: "the story reviewers that have checked a played turn's beats",
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
