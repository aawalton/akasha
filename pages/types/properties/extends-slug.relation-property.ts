import type { Slug } from "../../properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-properties/relation-property.page-type.ts"

export type ExtendsSlug = Slug

export const extendsSlug = {
  id: "01a049b9-856c-78f3-ac14-e3f86c75d104",
  pageTypeSlug: "relation-property",
  slug: "extends-slug",
  propertySlug: "extends-slug",
  definition: "a type a type takes its properties from",
  targetPageTypeSlug: "page-type/page-type",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A type takes its properties from every type this names.",
    },
    {
      invariantKind: "departure",
      statement: "Where two of them declare one property, the nearer type decides.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where both are equally near, the last named decides, so reordering changes what the type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A type naming none of them states an empty list rather than nothing.",
    },
  ],
} as const satisfies RelationProperty
