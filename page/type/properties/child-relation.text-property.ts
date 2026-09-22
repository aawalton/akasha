import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const childRelation = {
  id: "01a0683a-620a-74d3-99e4-844f9991c615",
  type: "page-type/text-property",
  slug: "child-relation",
  propertySlug: "child-relation",
  definition: "the key by which a child page names the page holding it",
  maxLength: 64,
  nameFormat: "name-format/lower-camel-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key named here that the gathered page type does not have gathers nothing.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
