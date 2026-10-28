import type { ExposureUnit } from "akasha/alan/medicine/risk-activity/properties/exposure-unit.text-property.types.ts"
import type { HealthSources } from "akasha/alan/medicine/risk-activity/properties/health-sources.record-property.types.ts"
import type { InjuryDisability } from "akasha/alan/medicine/risk-activity/properties/injury-disability.record-property.types.ts"
import type { MicromortsPerUnitCentral } from "akasha/alan/medicine/risk-activity/properties/micromorts-per-unit-central.number-property.types.ts"
import type { MicromortsPerUnitHigh } from "akasha/alan/medicine/risk-activity/properties/micromorts-per-unit-high.number-property.types.ts"
import type { MicromortsPerUnitLow } from "akasha/alan/medicine/risk-activity/properties/micromorts-per-unit-low.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type RiskActivity = Page & {
  exposureUnit: ExposureUnit
  micromortsPerUnitLow: MicromortsPerUnitLow
  micromortsPerUnitCentral: MicromortsPerUnitCentral
  micromortsPerUnitHigh: MicromortsPerUnitHigh
  injuryDisability?: InjuryDisability
  sources?: HealthSources
}
