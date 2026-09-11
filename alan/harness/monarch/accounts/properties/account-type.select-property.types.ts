import type { accountType } from "akasha/alan/harness/monarch/accounts/properties/account-type.select-property.ts"

export type AccountType = (typeof accountType.values)[number]
