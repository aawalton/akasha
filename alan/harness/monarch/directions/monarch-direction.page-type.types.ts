import type { MonarchRecord } from "../records/monarch-record.page-type.ts"
import type { AppliesWhen } from "./properties/applies-when.text-property.ts"
import type { Directs } from "./properties/directs.text-property.ts"

export type MonarchDirection = MonarchRecord & {
  appliesWhen: AppliesWhen
  directs: Directs
}
