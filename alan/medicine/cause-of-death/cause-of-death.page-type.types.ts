import type { BaselineRates } from "akasha/alan/medicine/cause-of-death/properties/baseline-rates.record-property.types.ts"
import type { DisabilityWeight } from "akasha/alan/medicine/cause-of-death/properties/disability-weight.number-property.types.ts"
import type { DisabilityYearsBeforeDeath } from "akasha/alan/medicine/cause-of-death/properties/disability-years-before-death.number-property.types.ts"
import type { Icd10Codes } from "akasha/alan/medicine/cause-of-death/properties/icd10-codes.text-property.types.ts"
import type { RiskFactors } from "akasha/alan/medicine/cause-of-death/properties/risk-factors.record-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type CauseOfDeath = Page & {
  icd10Codes?: Icd10Codes
  baselineRates?: BaselineRates
  riskFactors?: RiskFactors
  disabilityYearsBeforeDeath?: DisabilityYearsBeforeDeath
  disabilityWeight?: DisabilityWeight
}
