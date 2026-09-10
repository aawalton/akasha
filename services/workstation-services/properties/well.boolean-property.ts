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
      statement: "The verdict holds one look's finding rather than the service's state now.",
    },
    {
      invariantKind: "departure",
      statement:
        "A look writes the verdict only where the look's finding differs from the verdict written.",
    },
    {
      invariantKind: "departure",
      statement: "The verdict carries no moment.",
    },
    {
      invariantKind: "departure",
      statement: "How long ago the verdict was written says nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A value cleared away is written again by the next look.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service no longer looked at keeps the verdict the last look reaching that service left.",
    },
  ],
} as const satisfies BooleanProperty
