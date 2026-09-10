import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type LookedAt = string

export const lookedAt = {
  id: "01a08c77-9213-76ab-95b0-c5a7ef80750d",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "looked-at",
  propertySlug: "looked-at",
  definition: "when a service's health was last read",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service nothing has looked at states no moment.",
    },
    {
      invariantKind: "departure",
      statement: "This moves on every look, whether or not what the look found changed.",
    },
    {
      invariantKind: "departure",
      statement: "A reader judges what the look found by how long ago this was.",
    },
  ],
} as const satisfies InstantProperty
