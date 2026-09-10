import type { PageType } from "../types/page-type.page-type.types.ts"

export const pageQuery = {
  id: "01a063ee-2a3a-7dd7-8509-19858f61fe50",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "page-query",
  definition: "a question asked of the pages of one page type",
  pluralSlug: "page-queries",
  parts: [
    "boolean-property/descending",
    "number-property/limit",
    "number-property/offset",
    "record-property/narrows",
    "record-property/parameters",
    "text-property/asks-of-slug",
    "text-property/count-by",
    "text-property/keys",
    "text-property/narrow-comparison",
    "text-property/narrow-key",
    "text-property/narrow-values",
    "text-property/parameter-name",
    "text-property/parameter-type",
    "text-property/reduction",
    "text-property/sort-by",
    "text-property/target-key",
  ],
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/asks-of-slug", required: true, many: false },
    { pageProperty: "record-property/parameters", required: false, many: true, maxCount: 5 },
    { pageProperty: "record-property/narrows", required: false, many: true, maxCount: 10 },
    { pageProperty: "text-property/count-by", required: false, many: true, maxCount: 10 },
    { pageProperty: "text-property/reduction", required: false, many: false },
    { pageProperty: "text-property/target-key", required: false, many: false },
    { pageProperty: "text-property/keys", required: false, many: true, maxCount: 40 },
    { pageProperty: "text-property/sort-by", required: false, many: false },
    {
      pageProperty: "boolean-property/descending",
      required: false,
      many: false,
      default: "false",
    },
    { pageProperty: "number-property/limit", required: false, many: false },
    { pageProperty: "number-property/offset", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query has nothing about how its answer is shown.",
    },
    {
      invariantKind: "departure",
      statement: "A query names a single page type rather than two at once.",
    },
    {
      invariantKind: "departure",
      statement: "A query is the question rather than any answer taken from the query.",
    },
    {
      invariantKind: "departure",
      statement: "The same query asked twice over the same pages answers the same.",
    },
    {
      invariantKind: "departure",
      statement: "A query counting by a key and reducing to a number is asking two questions.",
    },
    {
      invariantKind: "departure",
      statement: "A query refuses anything the query cannot read.",
    },
    {
      invariantKind: "absence",
      statement: "A query has no title.",
    },
    {
      invariantKind: "gap",
      statement: "A query's name is recovered from its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A query is stated in page properties rather than in a language of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A query tests one page at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A query compares a value by the type its property declares.",
    },
    {
      invariantKind: "absence",
      statement: "No narrow is joined to another with or.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every key a query names is declared by the page type that query asks of.",
    },
  ],
  types: "ts",
} as const satisfies PageType
