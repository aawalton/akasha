import type { RelationProperty } from "../../../relation-properties/relation-property.page-type.ts"

export type UniqueScope = string

export const uniqueScope = {
  id: "01a07c96-3272-7d36-9394-051287145f2a",
  pageTypeSlug: "relation-property",
  slug: "unique-scope",
  propertySlug: "unique-scope",
  definition: "the property whose value a unique value is unique within",
  targetPageTypeSlug: "page-type/page-property",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A property naming a scope is unique within that scope rather than across its page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "The property a scope names is declared on the same page type as the property naming that scope.",
    },
    {
      invariantKind: "departure",
      statement: "The property a scope names is required.",
    },
    {
      invariantKind: "departure",
      statement: "The property a scope names carries one value.",
    },
    {
      invariantKind: "departure",
      statement: "A scope narrows the reach `page-type`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property stating no scope is unique across the whole reach that property states.",
    },
  ],
} as const satisfies RelationProperty
