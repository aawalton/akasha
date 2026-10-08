import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sequenceOrderBy = {
  id: "01a062de-2001-7002-8dd0-f44937908528",
  type: "page-type/text-property",
  slug: "sequence-order-by",
  propertySlug: "order-by",
  definition: "the sort key of a run of pages",
  maxLength: 64,
  nameFormat: "name-format/lower-camel-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key named here that the page type has no property for sorts nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T16:05:19.489Z",
  updatedAt: "2026-09-22T13:46:01.000Z",
} as const satisfies TextProperty
