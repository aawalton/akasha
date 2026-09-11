import type { AnchorBlockWeeks } from "akasha/alan/values/health/fitness/selection-policies/properties/anchor-block-weeks.number-property.types.ts"
import type { AnchorEscapeRpeCeiling } from "akasha/alan/values/health/fitness/selection-policies/properties/anchor-escape-rpe-ceiling.number-property.types.ts"
import type { LayoffGraceDays } from "akasha/alan/values/health/fitness/selection-policies/properties/layoff-grace-days.number-property.types.ts"
import type { LayoffMaxLoadReduction } from "akasha/alan/values/health/fitness/selection-policies/properties/layoff-max-load-reduction.number-property.types.ts"
import type { LayoffSaturationDays } from "akasha/alan/values/health/fitness/selection-policies/properties/layoff-saturation-days.number-property.types.ts"
import type { NoveltyCapPerSession } from "akasha/alan/values/health/fitness/selection-policies/properties/novelty-cap-per-session.number-property.types.ts"
import type { RecencySaturationDays } from "akasha/alan/values/health/fitness/selection-policies/properties/recency-saturation-days.number-property.types.ts"
import type { RecencyWeight } from "akasha/alan/values/health/fitness/selection-policies/properties/recency-weight.number-property.types.ts"
import type { WeeklySetCeiling } from "akasha/alan/values/health/fitness/selection-policies/properties/weekly-set-ceiling.number-property.types.ts"
import type { WeeklySetFloor } from "akasha/alan/values/health/fitness/selection-policies/properties/weekly-set-floor.number-property.types.ts"
import type { WeightAesthetics } from "akasha/alan/values/health/fitness/selection-policies/properties/weight-aesthetics.number-property.types.ts"
import type { WeightEnergy } from "akasha/alan/values/health/fitness/selection-policies/properties/weight-energy.number-property.types.ts"
import type { WeightFunctionality } from "akasha/alan/values/health/fitness/selection-policies/properties/weight-functionality.number-property.types.ts"
import type { WeightLongevity } from "akasha/alan/values/health/fitness/selection-policies/properties/weight-longevity.number-property.types.ts"
import type { Zone2WeeklyFloor } from "akasha/alan/values/health/fitness/selection-policies/properties/zone2-weekly-floor.number-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type SelectionPolicy = Page & {
  weightLongevity: WeightLongevity
  weightEnergy: WeightEnergy
  weightFunctionality: WeightFunctionality
  weightAesthetics: WeightAesthetics
  noveltyCapPerSession: NoveltyCapPerSession
  anchorBlockWeeks: AnchorBlockWeeks
  anchorEscapeRpeCeiling: AnchorEscapeRpeCeiling
  layoffGraceDays: LayoffGraceDays
  layoffMaxLoadReduction: LayoffMaxLoadReduction
  layoffSaturationDays: LayoffSaturationDays
  weeklySetFloor: WeeklySetFloor
  weeklySetCeiling: WeeklySetCeiling
  zone2WeeklyFloor: Zone2WeeklyFloor
  recencyWeight: RecencyWeight
  recencySaturationDays: RecencySaturationDays
}
