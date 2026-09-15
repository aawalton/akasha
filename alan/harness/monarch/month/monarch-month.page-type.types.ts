import type { StartsOn } from "akasha/alan/harness/monarch/month/properties/starts-on.calendar-date-property.types.ts"
import type { Transactions } from "akasha/alan/harness/monarch/month/properties/transactions.page-property-entry.types.ts"
import type { MonarchRecord } from "akasha/alan/harness/monarch/record/monarch-record.page-type.types.ts"

export type MonarchMonth = MonarchRecord & {
  startsOn: StartsOn
  transactions: Transactions
}
