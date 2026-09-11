import type { Account } from "akasha/alan/harness/monarch/holdings/properties/account.relation-property.types.ts"
import type { CostBasis } from "akasha/alan/harness/monarch/holdings/properties/cost-basis.number-property.types.ts"
import type { HoldingValue } from "akasha/alan/harness/monarch/holdings/properties/holding-value.number-property.types.ts"
import type { Quantity } from "akasha/alan/harness/monarch/holdings/properties/quantity.number-property.types.ts"
import type { SecurityName } from "akasha/alan/harness/monarch/holdings/properties/security-name.text-property.types.ts"
import type { Ticker } from "akasha/alan/harness/monarch/holdings/properties/ticker.text-property.types.ts"
import type { MonarchRecord } from "akasha/alan/harness/monarch/records/monarch-record.page-type.types.ts"

export type MonarchHolding = MonarchRecord & {
  account: Account
  securityName: SecurityName
  ticker: Ticker
  quantity: Quantity
  costBasis: CostBasis
  holdingValue: HoldingValue
}
