import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type Transactions = "jsonl"

export const transactions = {
  id: "01a0680b-2b00-7011-9f83-5c2a6e4b2112",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "transactions",
  propertySlug: "transactions",
  definition: "the movements of money a month covers, one to a line",
  properties: [
    { pageProperty: "text-property/monarch-id", required: true, many: false },
    { pageProperty: "instant-property/monarch-updated-at", required: true, many: false },
    { pageProperty: "calendar-date-property/transaction-day", required: true, many: false },
    { pageProperty: "number-property/amount", required: true, many: false },
    { pageProperty: "text-property/merchant", required: true, many: false },
    { pageProperty: "text-property/account-name", required: true, many: false },
    { pageProperty: "relation-property/account", required: true, many: false },
    { pageProperty: "relation-property/transaction-category", required: true, many: false },
    { pageProperty: "text-property/statement-line", required: false, many: false },
    { pageProperty: "text-property/transaction-note", required: false, many: false },
    { pageProperty: "select-property/category-source", required: false, many: false },
    { pageProperty: "text-property/category-decided-by", required: false, many: false },
    { pageProperty: "text-property/amazon-order-number", required: false, many: false },
    {
      pageProperty: "relation-property/transaction-tags",
      required: false,
      many: true,
      maxCount: 20,
    },
    { pageProperty: "boolean-property/split", required: false, many: false },
    { pageProperty: "boolean-property/recurring", required: false, many: false },
    { pageProperty: "boolean-property/needs-review", required: false, many: false },
    { pageProperty: "boolean-property/pending", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A transaction sits beside the month its day falls in rather than in a file of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "Ten thousand transactions arrive from a poller and nobody writes a transaction by hand.",
    },
    {
      invariantKind: "departure",
      statement: "An entry states nothing that entry has no value for.",
    },
    {
      invariantKind: "departure",
      statement: "A value an entry does not state is false or empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "Entries sit in the order of the day those entries fell on and then of their Monarch id.",
    },
    {
      invariantKind: "departure",
      statement:
        "A split transaction leaves the list Monarch serves and its parts are there in its place.",
    },
    {
      invariantKind: "departure",
      statement: "A split transaction stays alive and reachable by its own id.",
    },
    {
      invariantKind: "departure",
      statement: "An entry's id is carried across a resync rather than minted again.",
    },
  ],
} as const satisfies PagePropertyEntry
