import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const nameFormat = {
  id: "01a049b9-856c-73f0-bea2-c3036209aa09",
  type: "relation-property",
  slug: "name-format",
  propertySlug: "name-format",
  definition: "the format a text value is written in",
  nullable: true,
  targetPageType: "page-type/name-format",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page held to no format states null rather than nothing.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
