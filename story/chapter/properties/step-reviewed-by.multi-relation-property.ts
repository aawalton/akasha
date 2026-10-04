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
      statement: "A reviewer named here does not run on the turn again while it is named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn the last reviewer sends back loses from here each reviewer with an issue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "So only those reviewers review the mended turn, until none has an issue left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mend leaves this list as it is, whatever beats it moves.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
