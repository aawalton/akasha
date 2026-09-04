import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Transactions = "jsonl"

export const transactions = {
  id: "01a0680b-2b00-7011-9f83-5c2a6e4b2112",
  pageTypeSlug: "page-property-entry",
  slug: "transactions",
  propertySlug: "transactions",
  definition: "the movements of money a month covers, one to a line",
  properties: [
    { pagePropertySlug: "monarch-id", required: true, many: false },
    { pagePropertySlug: "monarch-updated-at", required: true, many: false },
    { pagePropertySlug: "transaction-day", required: true, many: false },
    { pagePropertySlug: "amount", required: true, many: false },
    { pagePropertySlug: "merchant", required: true, many: false },
    { pagePropertySlug: "account-name", required: true, many: false },
    { pagePropertySlug: "account-slug", required: true, many: false },
    { pagePropertySlug: "category-slug", required: true, many: false },
    { pagePropertySlug: "statement-line", required: false, many: false },
    { pagePropertySlug: "transaction-note", required: false, many: false },
    { pagePropertySlug: "category-source", required: false, many: false },
    { pagePropertySlug: "category-decided-by", required: false, many: false },
    { pagePropertySlug: "amazon-order-number", required: false, many: false },
    { pagePropertySlug: "tag-slugs", required: false, many: true, max: 20 },
    { pagePropertySlug: "split", required: false, many: false },
    { pagePropertySlug: "recurring", required: false, many: false },
    { pagePropertySlug: "needs-review", required: false, many: false },
    { pagePropertySlug: "pending", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A transaction stands beside the month its day falls in rather than in a file of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Ten thousand of them arrive from a poller and nobody writes one by hand.",
    },
    {
      invariantKind: "departure",
      statement: "An entry states nothing it holds no value for, so absence is false or empty.",
    },
    {
      invariantKind: "departure",
      statement: "Entries stand in the order of the day they fell on, then of their Monarch id.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transaction that has been split leaves the list Monarch serves and its parts stand there in its place.",
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
