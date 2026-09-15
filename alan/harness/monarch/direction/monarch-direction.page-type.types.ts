import type { AppliesWhen } from "akasha/alan/harness/monarch/direction/properties/applies-when.text-property.types.ts"
import type { Directs } from "akasha/alan/harness/monarch/direction/properties/directs.text-property.types.ts"
import type { MonarchRecord } from "akasha/alan/harness/monarch/record/monarch-record.page-type.types.ts"

export type MonarchDirection = MonarchRecord & {
  appliesWhen: AppliesWhen
  directs: Directs
}
