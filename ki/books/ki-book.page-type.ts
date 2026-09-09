import type { PageType } from "@akasha/pages/page-type"

export const kiBook = {
  id: "01a06825-d0ec-7364-85c4-e2b19f12133e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "ki-book",
  definition: "one edition of a book Ki keeps",
  pluralSlug: "ki-books",
  extends: ["page-type/ki-collection-template"],
  parts: [],
  properties: [
    { pageProperty: "text-property/isbn", required: false, many: false },
    { pageProperty: "text-property/isbn13", required: false, many: false },
    { pageProperty: "text-property/publisher", required: false, many: false },
    { pageProperty: "number-property/original-publication-year", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A book of Ki's names the one author credited first.",
    },
    {
      invariantKind: "departure",
      statement: "A book of Ki's names everyone else credited with writing the book.",
    },
  ],
  types: "ts",
} as const satisfies PageType
