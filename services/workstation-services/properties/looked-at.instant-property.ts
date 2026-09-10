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
      statement: "One service does the looking.",
    },
    {
      invariantKind: "departure",
      statement: "That service alone states the moment.",
    },
    {
      invariantKind: "departure",
      statement: "The moment moves on every look whether or not any verdict changed.",
    },
    {
      invariantKind: "departure",
      statement:
        "How long ago the moment was judges a verdict rather than anything on the verdict's page.",
    },
    {
      invariantKind: "departure",
      statement: "The moment is written after every verdict.",
    },
    {
      invariantKind: "departure",
      statement: "The moment says the whole look landed.",
    },
  ],
} as const satisfies InstantProperty
