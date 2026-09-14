import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const uniqueProperty = {
  id: "01a07c96-3272-7d36-9394-051287145f2a",
  type: "relation-property",
  slug: "unique-property",
  propertySlug: "unique-property",
  definition: "the property whose value a unique value is unique within",
  targetPageType: "page-type/page-property",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property naming one here is unique within that property's value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The property named here is declared on the same page type as the property naming it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The property named here is required.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The property named here has one value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Naming a property makes the unique kind `page-property` rather than `page-type`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property naming none is unique across the whole of the kind it states.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
