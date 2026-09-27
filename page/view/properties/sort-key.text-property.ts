import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sortKey = {
  id: "01a0680d-4d00-7005-8f26-2a7d5c1b4106",
  type: "page-type/text-property",
  slug: "sort-key",
  propertySlug: "key",
  definition: "a property ordering a view's pages",
  namesAPropertyKey: true,
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key `random` names no property and orders a view's pages in a shuffle.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
