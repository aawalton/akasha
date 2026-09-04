import type { PageType } from "@akasha/pages-system/page-type"
import type { MonarchRecord } from "../monarch-records/monarch-record.page-type.ts"
import type { AccountSlug } from "./properties/account-slug.relation-property.ts"
import type { CostBasis } from "./properties/cost-basis.number-property.ts"
import type { HoldingValue } from "./properties/holding-value.number-property.ts"
import type { Quantity } from "./properties/quantity.number-property.ts"
import type { SecurityName } from "./properties/security-name.text-property.ts"
import type { Ticker } from "./properties/ticker.text-property.ts"

export type MonarchHolding = MonarchRecord & {
  accountSlug: AccountSlug
  securityName: SecurityName
  ticker: Ticker
  quantity: Quantity
  costBasis: CostBasis
  holdingValue: HoldingValue
}

export const monarchHolding = {
  id: "01a0680a-1a00-7016-b283-5a9c7e1f1116",
  pageTypeSlug: "page-type",
  slug: "monarch-holding",
  definition: "how much of one investment an account holds",
  pluralSlug: "monarch-holdings",
  extendsSlug: ["page-type/monarch-record"],
  partSlugs: [
    "number-property/cost-basis",
    "number-property/holding-value",
    "number-property/quantity",
    "relation-property/account-slug",
    "text-property/security-name",
    "text-property/ticker",
  ],
  properties: [
    { pagePropertySlug: "account-slug", required: true, many: false },
    { pagePropertySlug: "security-name", required: true, many: false },
    { pagePropertySlug: "ticker", required: true, many: false },
    { pagePropertySlug: "quantity", required: true, many: false },
    { pagePropertySlug: "cost-basis", required: true, many: false },
    { pagePropertySlug: "holding-value", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Monarch reports a holding only for an account that says it has holdings.",
    },
    {
      invariantKind: "departure",
      statement: "A holding is three figures the daily sync rewrites, so it stands in memory.",
    },
  ],
} as const satisfies PageType
