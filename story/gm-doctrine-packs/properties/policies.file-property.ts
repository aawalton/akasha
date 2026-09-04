import type { FileProperty } from "@akasha/pages-system/file-property"

export type Policies = "json"

export const policies = {
  id: "01a06590-c57a-759d-9dcc-73c83dba1a1a",
  pageTypeSlug: "file-property",
  slug: "policies",
  propertySlug: "policies",
  definition: "the rulings a game master applies, each named and versioned",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A policy the pack owns is known by an id opening with doctrine.",
    },
  ],
} as const satisfies FileProperty
