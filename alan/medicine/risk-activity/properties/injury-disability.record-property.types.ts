import type { DisabilityWeight } from "akasha/alan/medicine/cause-of-death/properties/disability-weight.number-property.types.ts"
import type { DisabilityYears } from "akasha/alan/medicine/risk-activity/properties/disability-years.number-property.types.ts"
import type { InjuriesPerMillionUnits } from "akasha/alan/medicine/risk-activity/properties/injuries-per-million-units.number-property.types.ts"
import type { InjuryName } from "akasha/alan/medicine/risk-activity/properties/injury-name.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type InjuryDisability = List<{
  injury: InjuryName
  injuriesPerMillionUnits: InjuriesPerMillionUnits
  disabilityWeight: DisabilityWeight
  disabilityYears: DisabilityYears
}>
