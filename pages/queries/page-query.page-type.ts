import type { Page } from "../page.page-type.ts"
import type { PageType } from "../page-types/page-type.page-type.ts"
import type { AsksOfSlug } from "./properties/asks-of-slug.text-property.ts"
import type { CountBy } from "./properties/count-by.text-property.ts"
import type { Descending } from "./properties/descending.boolean-property.ts"
import type { Keys } from "./properties/keys.text-property.ts"
import type { Limit } from "./properties/limit.number-property.ts"
import type { Narrows } from "./properties/narrows.record-property.ts"
import type { Offset } from "./properties/offset.number-property.ts"
import type { Parameters } from "./properties/parameters.record-property.ts"
import type { Reduction } from "./properties/reduction.text-property.ts"
import type { SortBy } from "./properties/sort-by.text-property.ts"
import type { TargetKey } from "./properties/target-key.text-property.ts"

export type PageQuery = Page & {
  asksOfSlug: AsksOfSlug
  parameters?: Parameters
  narrows?: Narrows
  countBy?: CountBy
  reduction?: Reduction
  targetKey?: TargetKey
  keys?: Keys
  sortBy?: SortBy
  descending?: Descending
  limit?: Limit
  offset?: Offset
}

export const pageQuery = {
  id: "01a063ee-2a3a-7dd7-8509-19858f61fe50",
  pageTypeSlug: "page-type",
  slug: "page-query",
  definition: "a question asked of the pages of one page type",
  pluralSlug: "page-queries",
  partSlugs: [
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
  extendsSlug: ["page-type/page"],
  properties: [
    { pagePropertySlug: "asks-of-slug", required: true, many: false },
    { pagePropertySlug: "parameters", required: false, many: true, max: 5 },
    { pagePropertySlug: "narrows", required: false, many: true, max: 10 },
    { pagePropertySlug: "count-by", required: false, many: true, max: 10 },
    { pagePropertySlug: "reduction", required: false, many: false },
    { pagePropertySlug: "target-key", required: false, many: false },
    { pagePropertySlug: "keys", required: false, many: true, max: 40 },
    { pagePropertySlug: "sort-by", required: false, many: false },
    { pagePropertySlug: "descending", required: false, many: false, default: "false" },
    { pagePropertySlug: "limit", required: false, many: false },
    { pagePropertySlug: "offset", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query holds nothing about how its answer is shown.",
    },
    {
      invariantKind: "departure",
      statement: "A query asks of one page type rather than of several at once.",
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
      statement: "A query refuses what the query cannot read.",
    },
    {
      invariantKind: "absence",
      statement: "A query carries no title.",
    },
    {
      invariantKind: "gap",
      statement: "What a query is called is recovered from its slug.",
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
  ],
} as const satisfies PageType
