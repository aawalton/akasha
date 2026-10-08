import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const errorUrl = {
  id: "01a05f3f-e3e0-7ea0-a46e-cdf0d9e4d008",
  type: "page-type/text-property",
  slug: "error-url",
  propertySlug: "url",
  definition: "where a client was when a client met an error",
  maxLength: 2048,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A url is the url the reporting client was reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A url could have a token a query string has.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T23:13:37.760Z",
  updatedAt: "2026-09-24T23:22:29.000Z",
} as const satisfies TextProperty
