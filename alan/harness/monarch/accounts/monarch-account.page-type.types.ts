import type { MonarchRecord } from "../records/monarch-record.page-type.types.ts"
import type { AccountActive } from "./properties/account-active.boolean-property.types.ts"
import type { AccountDisplayName } from "./properties/account-display-name.text-property.types.ts"
import type { AccountHidden } from "./properties/account-hidden.boolean-property.types.ts"
import type { AccountType } from "./properties/account-type.select-property.types.ts"
import type { Asset } from "./properties/asset.boolean-property.types.ts"
import type { CurrentBalance } from "./properties/current-balance.number-property.types.ts"

export type MonarchAccount = MonarchRecord & {
  accountDisplayName: AccountDisplayName
  currentBalance: CurrentBalance
  accountType: AccountType
  asset: Asset
  accountActive: AccountActive
  accountHidden: AccountHidden
}
