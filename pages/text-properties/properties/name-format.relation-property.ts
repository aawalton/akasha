import type { Slug } from "../../properties/slug.text-property.ts"
import type { RelationProperty } from "../../relation-properties/relation-property.page-type.types.ts"

export type NameFormat = Slug | null

export const nameFormat = {
  id: "01a049b9-856c-73f0-bea2-c3036209aa09",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "name-format",
  propertySlug: "name-format",
  definition: "the format a text value is written in",
  targetPageType: "page-type/name-format",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page held to no format states null rather than nothing.",
    },
  ],
} as const satisfies RelationProperty
