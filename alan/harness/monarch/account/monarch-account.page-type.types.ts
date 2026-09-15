import type { AccountActive } from "akasha/alan/harness/monarch/account/properties/account-active.boolean-property.types.ts"
import type { AccountDisplayName } from "akasha/alan/harness/monarch/account/properties/account-display-name.text-property.types.ts"
import type { AccountHidden } from "akasha/alan/harness/monarch/account/properties/account-hidden.boolean-property.types.ts"
import type { AccountType } from "akasha/alan/harness/monarch/account/properties/account-type.select-property.types.ts"
import type { Asset } from "akasha/alan/harness/monarch/account/properties/asset.boolean-property.types.ts"
import type { CurrentBalance } from "akasha/alan/harness/monarch/account/properties/current-balance.number-property.types.ts"
import type { MonarchRecord } from "akasha/alan/harness/monarch/record/monarch-record.page-type.types.ts"

export type MonarchAccount = MonarchRecord & {
  accountDisplayName: AccountDisplayName
  currentBalance: CurrentBalance
  accountType: AccountType
  asset: Asset
  accountActive: AccountActive
  accountHidden: AccountHidden
}
