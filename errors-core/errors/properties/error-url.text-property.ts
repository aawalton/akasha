import type { TextProperty } from "@akasha/pages-system/text-property"

export type Url = string

export const errorUrl = {
  id: "01a05f3f-e3e0-7ea0-a46e-cdf0d9e4d008",
  pageTypeSlug: "text-property",
  slug: "error-url",
  propertySlug: "url",
  definition: "where a client was when a client met an error",
  max: 2048,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A url is the one the reporting client was reading.",
    },
    {
      invariantKind: "gap",
      statement: "A url could carry a token a query string holds.",
    },
  ],
} as const satisfies TextProperty
