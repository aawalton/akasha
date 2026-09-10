import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const bookSeries = {
  id: "01a06598-222b-7003-beee-2001c8924b27",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "book-series",
  definition: "a shelf with the books of one work",
  pluralSlug: "book-series",
  extends: ["page-type/collection-external"],
  parts: ["select-property/maturity-rating"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/maturity-rating", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A series has books alone.",
    },
    {
      invariantKind: "departure",
      statement: "The books a series has are the books naming that series.",
    },
    {
      invariantKind: "departure",
      statement: "A series Alan has not graded states no rank.",
    },
    {
      invariantKind: "departure",
      statement: "A series opening its name with a number is slugged for its page type first.",
    },
  ],
  types: "ts",
} as const satisfies PageType
