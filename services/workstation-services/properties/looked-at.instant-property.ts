import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type LookedAt = string

export const lookedAt = {
  id: "01a08c77-9213-76ab-95b0-c5a7ef80750d",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "looked-at",
  propertySlug: "looked-at",
  definition: "when this service last looked at the health of every workstation service",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One service does the looking, and that service alone states this.",
    },
    {
      invariantKind: "departure",
      statement: "This moves on every look, whether or not any verdict changed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A verdict is judged by how long ago this was rather than by anything on the verdict's own page.",
    },
    {
      invariantKind: "departure",
      statement: "This is written after every verdict, so this says the whole look landed.",
    },
  ],
} as const satisfies InstantProperty
