import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const afterChecks = {
  id: "01a05031-3a74-7ba8-849b-751fec68738d",
  type: "page-type/boolean-property",
  slug: "after-checks",
  propertySlug: "after-checks",
  definition: "whether a value is worked out after the checks pass rather than before them",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value worked out after the checks is spent by no refusal and is seen by no check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value worked out before the checks is judged like any other value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal wastes a value worked out before the checks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the index needs to file a page at all waits for nothing.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
