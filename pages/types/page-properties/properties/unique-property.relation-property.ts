import type { RelationProperty } from "../../../relation-properties/relation-property.page-type.ts"

export type UniqueProperty = string

export const uniqueProperty = {
  id: "01a07c96-3272-7d36-9394-051287145f2a",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "unique-property",
  propertySlug: "unique-property",
  definition: "the property whose value a unique value is unique within",
  targetPageType: "page-type/page-property",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property naming one here is unique within that property's value.",
    },
    {
      invariantKind: "departure",
      statement:
        "The property named here is declared on the same page type as the property naming it.",
    },
    {
      invariantKind: "departure",
      statement: "The property named here is required.",
    },
    {
      invariantKind: "departure",
      statement: "The property named here has one value.",
    },
    {
      invariantKind: "departure",
      statement: "Naming a property makes the unique kind `page-property` rather than `page-type`.",
    },
    {
      invariantKind: "departure",
      statement: "A property naming none is unique across the whole of the kind it states.",
    },
  ],
} as const satisfies RelationProperty
