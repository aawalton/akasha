import type { Slug } from "../../properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-properties/relation-property.page-type.ts"
import type { List } from "../page-properties/page-property.page-type.ts"

export type ExtendsType = List<Slug>

export const extendsType = {
  id: "01a049b9-856c-78f3-ac14-e3f86c75d104",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "extends-type",
  propertySlug: "extends",
  definition: "a type a type takes its properties from",
  targetPageType: "page-type/page-type",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A type takes its properties from every type this names.",
    },
    {
      invariantKind: "departure",
      statement: "The nearer type decides where two of the types named declare one property.",
    },
    {
      invariantKind: "departure",
      statement: "The last named type decides where two types are equally near.",
    },
    {
      invariantKind: "departure",
      statement: "Reordering the types changes the type's properties.",
    },
    {
      invariantKind: "departure",
      statement: "A type naming no type states an empty list rather than nothing.",
    },
  ],
} as const satisfies RelationProperty
