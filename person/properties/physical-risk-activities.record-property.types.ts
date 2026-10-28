import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { RiskActivityName } from "akasha/person/properties/risk-activity-name.text-property.types.ts"
import type { RiskActivityNote } from "akasha/person/properties/risk-activity-note.text-property.types.ts"
import type { RiskActivityTimesPerYear } from "akasha/person/properties/risk-activity-times-per-year.number-property.types.ts"

export type PhysicalRiskActivities = List<{
  activity: RiskActivityName
  timesPerYear?: RiskActivityTimesPerYear
  note?: RiskActivityNote
}>
