import type { BooleanProperty } from "../../boolean-property/boolean-property.page-type.ts"

export type AfterChecks = boolean

export const afterChecks = {
  id: "01a05031-3a74-7ba8-849b-751fec68738d",
  pageTypeSlug: "boolean-property",
  slug: "after-checks",
  propertySlug: "after-checks",
  definition: "whether a value is worked out after the checks pass rather than before them",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A value worked out after the checks is spent by no refusal, and is seen by no check either.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value worked out before the checks is judged like any other value, and a refusal wastes one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value the index needs to file a page at all waits for nothing, because a page missing one is filed nowhere and every check reading the index is blind to it.",
    },
  ],
} as const satisfies BooleanProperty
