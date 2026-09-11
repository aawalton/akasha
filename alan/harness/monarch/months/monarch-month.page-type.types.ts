import type { StartsOn } from "akasha/alan/harness/monarch/months/properties/starts-on.calendar-date-property.types.ts"
import type { Transactions } from "akasha/alan/harness/monarch/months/properties/transactions.page-property-entry.types.ts"
import type { MonarchRecord } from "akasha/alan/harness/monarch/records/monarch-record.page-type.types.ts"

export type MonarchMonth = MonarchRecord & {
  startsOn: StartsOn
  transactions: Transactions
}
