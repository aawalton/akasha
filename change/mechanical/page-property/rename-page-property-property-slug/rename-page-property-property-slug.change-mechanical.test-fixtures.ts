import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const WOLD_BODY = `export const wold = {
  id: "wold-id",
  type: "file-property",
  slug: "wold",
  propertySlug: "wold",
} as const
`

export const NOTE_BODY = `export const note = {
  id: "note-id",
  type: "relation-property",
  slug: "note",
  propertySlug: "note",
} as const
`

export const ONE_BODY = `export const one = {
  id: "one",
  pageTypeSlug: "quoin",
  slug: "one",
  wold: "ts",
  note: "quoin/two",
} as const
`

export const TWO_BODY = `export const two = {
  id: "two",
  pageTypeSlug: "quoin",
  slug: "two",
  wold: "ts",
} as const
`

export const TYPES_BODY = "export type Quoin = { wold: string; note: string }\n"

export const MONTH_TYPES_AT = "akasha/month.page-type.types.ts"

export const ROWS_TO = "akasha/months/one.month.tallies-held.jsonl"

export const ENTRY_BODY = `export const tallies = {
  id: "tallies-id",
  type: "page-property-entry",
  slug: "tallies",
  propertySlug: "tallies",
} as const
`

export const MONTH_BODY = `export const one = {
  id: "month-one",
  pageTypeSlug: "month",
  slug: "one",
  tallies: "jsonl",
} as const
`

export const VIEW_AT = "akasha/looking/looking.view.ts"

export const OTHER_AT = "akasha/other/other.view.ts"

const VIEW_BODY = `export const looking = {
  id: "looking",
  pageTypeSlug: "view",
  slug: "looking",
  pageType: "page-type/quoin",
  groupBy: "wold",
  visibleProperties: ["wold", "note"],
  viewSorts: [{ key: "wold", descending: false }],
} as const
`

const OTHER_BODY = `export const other = {
  id: "other",
  pageTypeSlug: "view",
  slug: "other",
  pageType: "page-type/month",
  visibleProperties: ["wold"],
} as const
`

export const VIEW_BODIES: Readonly<Record<string, string>> = {
  [VIEW_AT]: VIEW_BODY,
  [OTHER_AT]: OTHER_BODY,
}

export const VIEW_VALUES: Readonly<Record<string, Value>> = {
  "quoin-property/grouped": { slug: "grouped", namesAPropertyKey: true },
  "quoin-property/shown": { slug: "shown", namesAPropertyKey: true },
  "quoin-property/ordered-by": { slug: "ordered-by", namesAPropertyKey: true },
  "quoin-record/ordering": { slug: "ordering" },
  "view/looking": {
    id: "looking",
    pageTypeSlug: "view",
    slug: "looking",
    pageType: "page-type/quoin",
  },
  "view/other": {
    id: "other",
    pageTypeSlug: "view",
    slug: "other",
    pageType: "page-type/month",
  },
}

export const VIEW_DECLARED: readonly Value[] = [
  { pageTypeSlug: "quoin-property", pagePropertySlug: "grouped", key: "groupBy" },
  { pageTypeSlug: "quoin-property", pagePropertySlug: "shown", key: "visibleProperties" },
  { pageTypeSlug: "quoin-record", pagePropertySlug: "ordering", key: "viewSorts" },
]

export const VIEW_FIELDS: Readonly<Record<string, readonly Value[]>> = {
  ordering: [{ pageTypeSlug: "quoin-property", pagePropertySlug: "ordered-by", key: "key" }],
}
