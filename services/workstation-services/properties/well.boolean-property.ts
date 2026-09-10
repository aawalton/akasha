import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type Well = boolean

export const well = {
  id: "01a08c77-7bb7-706c-8b79-08bbd7620c7a",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "well",
  propertySlug: "well",
  definition: "whether a service was running as it should when last looked at",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service nothing has looked at states this neither way.",
    },
    {
      invariantKind: "departure",
      statement: "This is what one look found rather than what is so now.",
    },
    {
      invariantKind: "departure",
      statement: "This is written only where what a look found differs from what is already here.",
    },
    {
      invariantKind: "departure",
      statement: "This carries no moment.",
    },
    {
      invariantKind: "departure",
      statement: "How long ago this was written says nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A value cleared away is written again by the next look.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service no longer looked at keeps the value the last look that reached it left.",
    },
  ],
} as const satisfies BooleanProperty
