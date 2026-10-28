import type { HealthSourceCitation } from "akasha/alan/medicine/cause-of-death/properties/health-source-citation.text-property.types.ts"
import type { HealthSourceUrl } from "akasha/alan/medicine/cause-of-death/properties/health-source-url.url-property.types.ts"
import type { RelativeRiskCentral } from "akasha/alan/medicine/cause-of-death/properties/relative-risk-central.number-property.types.ts"
import type { RelativeRiskHigh } from "akasha/alan/medicine/cause-of-death/properties/relative-risk-high.number-property.types.ts"
import type { RelativeRiskLow } from "akasha/alan/medicine/cause-of-death/properties/relative-risk-low.number-property.types.ts"
import type { RiskFactorAppliedAs } from "akasha/alan/medicine/cause-of-death/properties/risk-factor-applied-as.text-property.types.ts"
import type { RiskFactorName } from "akasha/alan/medicine/cause-of-death/properties/risk-factor-name.text-property.types.ts"
import type { RiskFactorPersonProperty } from "akasha/alan/medicine/cause-of-death/properties/risk-factor-person-property.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type RiskFactors = List<{
  factor: RiskFactorName
  personProperty: RiskFactorPersonProperty
  appliedAs: RiskFactorAppliedAs
  relativeRiskLow: RelativeRiskLow
  relativeRiskCentral: RelativeRiskCentral
  relativeRiskHigh: RelativeRiskHigh
  citation: HealthSourceCitation
  url?: HealthSourceUrl
}>
