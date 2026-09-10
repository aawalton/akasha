import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const subagentReturned = {
  id: "01a08c53-fa24-7d4e-9769-2fd3c2ac37a3",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "subagent-returned",
  propertySlug: "returned",
  definition: "whether a subagent has returned from its run",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent at work says nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent that returned leaving no edits has no page to say this on.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
