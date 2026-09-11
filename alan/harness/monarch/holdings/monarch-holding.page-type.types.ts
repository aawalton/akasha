import type { MonarchRecord } from "../records/monarch-record.page-type.types.ts"
import type { Account } from "./properties/account.relation-property.types.ts"
import type { CostBasis } from "./properties/cost-basis.number-property.types.ts"
import type { HoldingValue } from "./properties/holding-value.number-property.types.ts"
import type { Quantity } from "./properties/quantity.number-property.types.ts"
import type { SecurityName } from "./properties/security-name.text-property.types.ts"
import type { Ticker } from "./properties/ticker.text-property.types.ts"

export type MonarchHolding = MonarchRecord & {
  account: Account
  securityName: SecurityName
  ticker: Ticker
  quantity: Quantity
  costBasis: CostBasis
  holdingValue: HoldingValue
}
