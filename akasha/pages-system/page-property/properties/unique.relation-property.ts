import type { RelationProperty } from "../relation-property.page-type.ts"

export type Unique = "always" | "page-type"

export const unique = {
  id: "01a04edd-897d-7695-8047-3d1c855b750f",
  pageTypeSlug: "relation-property",
  slug: "unique",
  definition: "the reach this property's value is unique across",
  targetPageTypeSlug: "page-type/unique-kind",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property stating no `unique` is not unique.",
    },
  ],
} as const satisfies RelationProperty
