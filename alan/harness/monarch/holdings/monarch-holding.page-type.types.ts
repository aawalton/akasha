import type { MonarchRecord } from "../records/monarch-record.page-type.types.ts"
import type { Account } from "./properties/account.relation-property.ts"
import type { CostBasis } from "./properties/cost-basis.number-property.ts"
import type { HoldingValue } from "./properties/holding-value.number-property.ts"
import type { Quantity } from "./properties/quantity.number-property.ts"
import type { SecurityName } from "./properties/security-name.text-property.ts"
import type { Ticker } from "./properties/ticker.text-property.ts"

export type MonarchHolding = MonarchRecord & {
  account: Account
  securityName: SecurityName
  ticker: Ticker
  quantity: Quantity
  costBasis: CostBasis
  holdingValue: HoldingValue
}
