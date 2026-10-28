import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { DiagnosedBy } from "akasha/person/properties/diagnosed-by.select-property.types.ts"
import type { HealthConditionName } from "akasha/person/properties/health-condition-name.text-property.types.ts"

export type HealthConditions = List<{
  condition: HealthConditionName
  diagnosedBy?: DiagnosedBy
}>
