import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const runsChecks = {
  id: "01a05e19-7ffa-7929-bb78-9aadbdefcc15",
  type: "page-type/boolean-property",
  slug: "runs-checks",
  propertySlug: "runs-checks",
  definition: "whether checks run on a change of this kind",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change kind whose changes are expected to pass checks runs checks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change kind whose changes are not expected to pass checks runs no check.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T17:52:04.602Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies BooleanProperty
