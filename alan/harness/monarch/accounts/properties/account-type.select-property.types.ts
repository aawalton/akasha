import type { accountType } from "./account-type.select-property.ts"

export type AccountType = (typeof accountType.values)[number]
