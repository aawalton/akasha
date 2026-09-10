import type { TextProperty } from "@akasha/pages/text-property"

export type ErrorUrl = string

export const errorUrl = {
  id: "01a05f3f-e3e0-7ea0-a46e-cdf0d9e4d008",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "error-url",
  propertySlug: "url",
  definition: "where a client was when a client met an error",
  maxLength: 2048,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A url is the url the reporting client was reading.",
    },
    {
      invariantKind: "gap",
      statement: "A url could have a token a query string has.",
    },
  ],
} as const satisfies TextProperty
