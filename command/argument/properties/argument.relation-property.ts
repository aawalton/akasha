import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const argument = {
  id: "01a09409-0740-76a5-b194-5aae0e0a6f9b",
  type: "relation-property",
  slug: "argument",
  propertySlug: "argument",
  definition: "the argument a command names",
  targetPageType: "page-type/argument",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument no page names is refused rather than read.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
