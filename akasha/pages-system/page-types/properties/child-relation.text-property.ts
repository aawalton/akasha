import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type ChildRelation = string

export const childRelation = {
  id: "01a0683a-620a-74d3-99e4-844f9991c615",
  pageTypeSlug: "text-property",
  slug: "child-relation",
  propertySlug: "child-relation",
  definition: "the key by which a gathered page names the page gathering it",
  max: 64,
  nameFormatSlug: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key named here that the gathered page type carries none of gathers nothing.",
    },
  ],
} as const satisfies TextProperty
