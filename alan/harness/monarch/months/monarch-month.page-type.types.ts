import type { MonarchRecord } from "../records/monarch-record.page-type.types.ts"
import type { StartsOn } from "./properties/starts-on.calendar-date-property.ts"
import type { Transactions } from "./properties/transactions.page-property-entry.ts"

export type MonarchMonth = MonarchRecord & {
  startsOn: StartsOn
  transactions: Transactions
}
