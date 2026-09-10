import type { BooleanProperty } from "../../../pages/boolean-properties/boolean-property.page-type.types.ts"

export type RunsChecks = boolean

export const runsChecks = {
  id: "01a05e19-7ffa-7929-bb78-9aadbdefcc15",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "runs-checks",
  propertySlug: "runs-checks",
  definition: "whether checks run on a change of this kind",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change kind whose changes are expected to pass checks runs checks.",
    },
    {
      invariantKind: "departure",
      statement: "A change kind whose changes are not expected to pass checks runs none.",
    },
  ],
} as const satisfies BooleanProperty
