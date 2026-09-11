import type { MonarchRecord } from "../records/monarch-record.page-type.types.ts"
import type { AppliesWhen } from "./properties/applies-when.text-property.types.ts"
import type { Directs } from "./properties/directs.text-property.types.ts"

export type MonarchDirection = MonarchRecord & {
  appliesWhen: AppliesWhen
  directs: Directs
}
