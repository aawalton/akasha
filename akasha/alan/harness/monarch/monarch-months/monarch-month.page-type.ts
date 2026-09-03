import type { PageType } from "@akasha/pages-system/page-type"
import type { MonarchRecord } from "../monarch-records/monarch-record.page-type.ts"
import type { StartsOn } from "./properties/starts-on.calendar-date-property.ts"
import type { Transactions } from "./properties/transactions.page-property-entry.ts"

export type MonarchMonth = MonarchRecord & {
  startsOn: StartsOn
  transactions: Transactions
}

export const monarchMonth = {
  id: "01a0680b-2b00-7012-a659-4d8f2c7e2113",
  pageTypeSlug: "page-type",
  slug: "monarch-month",
  definition: "one calendar month of the household's money",
  pluralSlug: "monarch-months",
  extendsSlug: "page-type/monarch-record",
  partSlugs: [
    "boolean-property/needs-review",
    "boolean-property/pending",
    "boolean-property/recurring",
    "boolean-property/split",
    "calendar-date-property/starts-on",
    "calendar-date-property/transaction-day",
    "instant-property/monarch-updated-at",
    "number-property/amount",
    "page-property-entry/transactions",
    "relation-property/category-slug",
    "relation-property/tag-slugs",
    "select-property/category-source",
    "text-property/account-name",
    "text-property/amazon-order-number",
    "text-property/category-decided-by",
    "text-property/merchant",
    "text-property/statement-line",
    "text-property/transaction-note",
  ],
  properties: [
    { pagePropertySlug: "starts-on", required: true, many: false },
    { pagePropertySlug: "transactions", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug opens with `month-` ahead of the year and the month it covers.",
    },
    {
      invariantKind: "departure",
      statement:
        "A month past the trusted period is closed, and nothing Monarch reports moves a row into or out of it.",
    },
    {
      invariantKind: "departure",
      statement: "The trusted period is the twelve months back from today.",
    },
    {
      invariantKind: "departure",
      statement:
        "A month states what it covers and nothing else, every word about the money standing on the transactions beside it.",
    },
  ],
} as const satisfies PageType
